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

// Auth routes
router.post('/register', createUser);
router.post('/login', login);

// User routes
router.get('/:id', authenticateToken, getUser);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, deleteUser);

// Profile routes
router.get('/:id/profile', authenticateToken, getUserProfile);
router.put('/:id/profile', authenticateToken, updateUserProfile);

export default router; 