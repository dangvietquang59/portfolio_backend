import express from 'express';
import { 
  createExperience,
  getExperiences,
  getExperience,
  updateExperience,
  deleteExperience
} from '../controllers/experienceController';
import { authenticateToken } from '../middlewares/auth';

const router = express.Router();

router.post('/', authenticateToken, createExperience);
router.get('/user/:userId', authenticateToken, getExperiences);
router.get('/:id', authenticateToken, getExperience);
router.put('/:id', authenticateToken, updateExperience);
router.delete('/:id', authenticateToken, deleteExperience);

export default router; 