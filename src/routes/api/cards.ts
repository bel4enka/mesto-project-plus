import { Router } from 'express';
import {
  createCard, deleteCard, dislikeCard,
  getCardById,
  getCards, likeCard,
} from '../../controllers/cards';
import validationObjectId from '../../errors/validationObjectId';

const router = Router();

router.post('/', createCard);
router.get('/', getCards);
router.get('/:id', validationObjectId, getCardById);
router.delete('/:id', validationObjectId, deleteCard);
router.put('/:id/likes', validationObjectId, likeCard);
router.delete('/:id/likes', validationObjectId, dislikeCard);

export default router;
