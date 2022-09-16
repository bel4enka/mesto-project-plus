import {
  Request,
  Response,
  NextFunction,
} from 'express';
import mongoose from 'mongoose';
import { celebrate, Joi } from 'celebrate';
import NotFoundError from './notFoundError';
import urlRegexp from '../helpers/regexp';

export const validationCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().uri().pattern(urlRegexp),
  }),
});
export const validationObjectId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NotFoundError('Неправильный идентификатор');
  }
  next();
};
