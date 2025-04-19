import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createExperience = async (req: Request, res: Response) => {
  try {
    const { title, company, location, startDate, endDate, current, description } = req.body;
    const userId = req.user.userId;

    const experience = await prisma.experience.create({
      data: {
        title,
        company,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current,
        description,
        userId
      }
    });

    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Error creating experience', error });
  }
};

export const getExperiences = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const experiences = await prisma.experience.findMany({
      where: { userId },
      orderBy: { startDate: 'desc' }
    });

    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experiences', error });
  }
};

export const getExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const experience = await prisma.experience.findUnique({
      where: { id }
    });

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experience', error });
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, company, location, startDate, endDate, current, description } = req.body;

    const experience = await prisma.experience.update({
      where: { id },
      data: {
        title,
        company,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current,
        description
      }
    });

    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Error updating experience', error });
  }
};

export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.experience.delete({
      where: { id }
    });

    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting experience', error });
  }
}; 