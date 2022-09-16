import { Router } from 'express';
import {
  getMyUser,
  getUserById,
  getUsers, updateAvatar, updateUser,
} from '../../controllers/user';
import validationObjectId from '../../errors/validationObjectId';

const router = Router();

router.get('/', getUsers);
router.get('/me', getMyUser);
router.get('/:id', validationObjectId, getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

export default router;
