import { Router } from 'express';
import {
  getMyUser,
  getUserById,
  getUsers, updateAvatar, updateUser,
} from '../../controllers/user';
import { validationObjectId } from '../../errors/validation';

const router = Router();

router.get('/', getUsers);
router.get('/me', getMyUser);
router.get('/:id', validationObjectId, getUserById);
router.patch('/me', validationObjectId, updateUser);
router.patch('/me/avatar', validationObjectId, updateAvatar);

export default router;
