import express from 'express';
import { 
  createUser, 
  getUser, 
  updateUser, 
  deleteUser,
  getUserProfile,
  updateUserProfile,
  login
} from '../controllers/userController';
import { authenticateToken } from '../middlewares/auth';

const router = express.Router();

// Public routes (no authentication required)
router.post('/register', createUser);
router.post('/login', login);

// Protected routes (authentication required)
router.get('/:username', getUser);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, deleteUser);
router.get('/:id/profile', authenticateToken, getUserProfile);
router.put('/:id/profile', authenticateToken, updateUserProfile);

export default router; 