import express from 'express';
import { 
  createEducation,
  getEducations,
  getEducation,
  updateEducation,
  deleteEducation
} from '../controllers/educationController';
import { authenticateToken } from '../middlewares/auth';

const router = express.Router();

router.post('/', authenticateToken, createEducation);
router.get('/user/:userId', authenticateToken, getEducations);
router.get('/:id', authenticateToken, getEducation);
router.put('/:id', authenticateToken, updateEducation);
router.delete('/:id', authenticateToken, deleteEducation);

export default router; 