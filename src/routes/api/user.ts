import { Router } from 'express';
import {
  getMyUser,
  getUserById,
  getUsers, updateAvatar, updateUser,
} from '../../controllers/user';
import {
  validationAvatar,
  validationObjectId,
  validationUser,
} from '../../errors/validation';

const router = Router();

router.get('/', getUsers);
router.get('/me', getMyUser);
router.get('/:id', validationObjectId, getUserById);
router.patch('/me', validationUser, updateUser);
router.patch('/me/avatar', validationAvatar, updateAvatar);

export default router;
