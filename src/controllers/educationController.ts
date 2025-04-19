import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { JwtPayload } from '../middlewares/auth';

const prisma = new PrismaClient();

export const createEducation = async (req: Request, res: Response) => {
  try {
    const { school, degree, fieldOfStudy, startDate, endDate, grade, activities, description } = req.body;
    const user = (req as any).user as JwtPayload;

    if (!user?.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const education = await prisma.education.create({
      data: {
        school,
        degree,
        fieldOfStudy,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        grade,
        activities,
        description,
        userId: user.userId
      }
    });

    res.status(201).json(education);
  } catch (error) {
    res.status(500).json({ message: 'Error creating education', error });
  }
};

export const getEducations = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const educations = await prisma.education.findMany({
      where: { userId },
      orderBy: { startDate: 'desc' }
    });

    res.json(educations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching educations', error });
  }
};

export const getEducation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const education = await prisma.education.findUnique({
      where: { id }
    });

    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }

    res.json(education);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching education', error });
  }
};

export const updateEducation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { school, degree, fieldOfStudy, startDate, endDate, grade, activities, description } = req.body;

    const education = await prisma.education.update({
      where: { id },
      data: {
        school,
        degree,
        fieldOfStudy,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        grade,
        activities,
        description
      }
    });

    res.json(education);
  } catch (error) {
    res.status(500).json({ message: 'Error updating education', error });
  }
};

export const deleteEducation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.education.delete({
      where: { id }
    });

    res.json({ message: 'Education deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting education', error });
  }
}; 