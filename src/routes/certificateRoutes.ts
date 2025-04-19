import express from 'express';
import { 
  createCertificate,
  getCertificates,
  getCertificate,
  updateCertificate,
  deleteCertificate
} from '../controllers/certificateController';
import { authenticateToken } from '../middlewares/auth';

const router = express.Router();

router.post('/', authenticateToken, createCertificate);
router.get('/user/:userId', authenticateToken, getCertificates);
router.get('/:id', authenticateToken, getCertificate);
router.put('/:id', authenticateToken, updateCertificate);
router.delete('/:id', authenticateToken, deleteCertificate);

export default router; 