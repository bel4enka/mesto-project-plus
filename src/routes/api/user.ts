import { Router } from 'express';
import {
  createUser,
  getUserById,
  getUsers, updateAvatar, updateUser,
} from '../../controllers/user';
import validationObjectId from '../../errors/validationObjectId';

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', validationObjectId, getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

export default router;
