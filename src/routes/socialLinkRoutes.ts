import express from 'express';
import { 
  createSocialLink,
  getSocialLinks,
  getSocialLink,
  updateSocialLink,
  deleteSocialLink
} from '../controllers/socialLinkController';
import { authenticateToken } from '../middlewares/auth';

const router = express.Router();

router.post('/', authenticateToken, createSocialLink);
router.get('/user/:userId', authenticateToken, getSocialLinks);
router.get('/:id', authenticateToken, getSocialLink);
router.put('/:id', authenticateToken, updateSocialLink);
router.delete('/:id', authenticateToken, deleteSocialLink);

export default router; 