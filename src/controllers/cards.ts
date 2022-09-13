import { NextFunction, Request, Response } from 'express';
import Cards from '../models/cards';
import { IUserRequest } from '../services/interface';
import NotFoundError from '../errors/notFoundError';
import BadRequestError from '../errors/BadRequestError';

const { Types } = require('mongoose');

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const card = {
    name: req.body.name,
    link: req.body.link,
    owner: (req as IUserRequest).user!._id,
  };
  return Cards.create(card)
    .then((newUser) => res.send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные'));
      }
      return next(err);
    });
};

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Cards.find({})
    .populate('owner')
    .then((card) => res.send({ data: card }))
    .catch(next);
};

export const getCardById = (req: Request, res: Response, next: NextFunction) => {
  Cards.findById(req.params.id)
    .orFail(new NotFoundError('Нет такой карточки'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError('Нет такой карточки'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные'));
      }
      return next(err);
    });
};
export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  Cards.deleteOne({ _id: req.params.id })
    .orFail(new NotFoundError('Нет такой карточки'))
    .then((data) => {
      if (data.deletedCount === 0) {
        throw new NotFoundError('Нет такой карточки');
      }
      res.send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError('Нет такой карточки'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные'));
      }
      return next(err);
    });
};
export const likeCard = (req: IUserRequest, res: Response, next: NextFunction) => {
  Cards.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { likes: Types.ObjectId(req?.user?._id) },
    },
    { new: true },
  )
    .orFail(new NotFoundError('Нет такой карточки'))
    .then((newCard) => res.send({ data: newCard }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError('Нет такой карточки'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные'));
      }
      return next(err);
    });
};
export const dislikeCard = (req: IUserRequest, res: Response, next: NextFunction) => {
  if (req.user) {
    Cards.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: Types.ObjectId(req.user._id) },
      },
      { new: true },
    )
      .orFail(new NotFoundError('Нет такой карточки'))
      .then((newCard) => res.send({ data: newCard }))
      .catch((err) => {
        if (err.name === 'CastError') {
          return next(new NotFoundError('Нет такой карточки'));
        }
        if (err.name === 'ValidationError') {
          return next(new BadRequestError('Некорректные данные'));
        }
        return next(err);
      });
  }
};
