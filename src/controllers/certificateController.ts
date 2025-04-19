import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCertificate = async (req: Request, res: Response) => {
  try {
    const { name, issuingOrg, issueDate, expiryDate, credentialId, credentialUrl } = req.body;
    const userId = req.user.userId;

    const certificate = await prisma.certificate.create({
      data: {
        name,
        issuingOrg,
        issueDate: new Date(issueDate),
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        credentialId,
        credentialUrl,
        userId
      }
    });

    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ message: 'Error creating certificate', error });
  }
};

export const getCertificates = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const certificates = await prisma.certificate.findMany({
      where: { userId },
      orderBy: { issueDate: 'desc' }
    });

    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certificates', error });
  }
};

export const getCertificate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const certificate = await prisma.certificate.findUnique({
      where: { id }
    });

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    res.json(certificate);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certificate', error });
  }
};

export const updateCertificate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, issuingOrg, issueDate, expiryDate, credentialId, credentialUrl } = req.body;

    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        name,
        issuingOrg,
        issueDate: new Date(issueDate),
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        credentialId,
        credentialUrl
      }
    });

    res.json(certificate);
  } catch (error) {
    res.status(500).json({ message: 'Error updating certificate', error });
  }
};

export const deleteCertificate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.certificate.delete({
      where: { id }
    });

    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting certificate', error });
  }
}; 