import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createSocialLink = async (req: Request, res: Response) => {
  try {
    const { platform, url } = req.body;
    const userId = req.user.userId;

    const socialLink = await prisma.socialLink.create({
      data: {
        platform,
        url,
        userId
      }
    });

    res.status(201).json(socialLink);
  } catch (error) {
    res.status(500).json({ message: 'Error creating social link', error });
  }
};

export const getSocialLinks = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const socialLinks = await prisma.socialLink.findMany({
      where: { userId }
    });

    res.json(socialLinks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching social links', error });
  }
};

export const getSocialLink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const socialLink = await prisma.socialLink.findUnique({
      where: { id }
    });

    if (!socialLink) {
      return res.status(404).json({ message: 'Social link not found' });
    }

    res.json(socialLink);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching social link', error });
  }
};

export const updateSocialLink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { platform, url } = req.body;

    const socialLink = await prisma.socialLink.update({
      where: { id },
      data: {
        platform,
        url
      }
    });

    res.json(socialLink);
  } catch (error) {
    res.status(500).json({ message: 'Error updating social link', error });
  }
};

export const deleteSocialLink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.socialLink.delete({
      where: { id }
    });

    res.json({ message: 'Social link deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting social link', error });
  }
}; 