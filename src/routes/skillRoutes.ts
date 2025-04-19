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

router.post('/', authenticateToken, createSkill as express.RequestHandler);
router.get('/user/:userId', authenticateToken, getSkills as express.RequestHandler);
router.get('/:id', authenticateToken, getSkill as express.RequestHandler);
router.put('/:id', authenticateToken, updateSkill as express.RequestHandler);
router.delete('/:id', authenticateToken, deleteSkill as express.RequestHandler);

export default router; 