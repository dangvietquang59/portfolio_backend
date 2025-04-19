import express from 'express';
import { 
  createSkill,
  getSkills,
  getSkill,
  updateSkill,
  deleteSkill
} from '../controllers/skillController';
import { authenticateToken } from '../middlewares/auth';

const router = express.Router();

router.post('/', authenticateToken, createSkill);
router.get('/user/:userId', authenticateToken, getSkills);
router.get('/:id', authenticateToken, getSkill);
router.put('/:id', authenticateToken, updateSkill);
router.delete('/:id', authenticateToken, deleteSkill);

export default router; 