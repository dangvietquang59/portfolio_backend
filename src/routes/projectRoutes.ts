import express from 'express';
import { 
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
} from '../controllers/projectController';
import { authenticateToken } from '../middlewares/auth';

const router = express.Router();

router.post('/', authenticateToken, createProject);
router.get('/user/:userId', authenticateToken, getProjects);
router.get('/:id', authenticateToken, getProject);
router.put('/:id', authenticateToken, updateProject);
router.delete('/:id', authenticateToken, deleteProject);

export default router; 