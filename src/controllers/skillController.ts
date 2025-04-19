import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth';

const prisma = new PrismaClient();

export const createSkill = async (req: AuthRequest, res: Response) => {
  try {
    const { name, level, category } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        level,
        category,
        userId
      }
    });

    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Error creating skill', error });
  }
};

export const getSkills = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const skills = await prisma.skill.findMany({
      where: { userId },
      orderBy: { category: 'asc' }
    });

    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills', error });
  }
};

export const getSkill = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const skill = await prisma.skill.findUnique({
      where: { id }
    });

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skill', error });
  }
};

export const updateSkill = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, level, category } = req.body;

    const skill = await prisma.skill.update({
      where: { id },
      data: {
        name,
        level,
        category
      }
    });

    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Error updating skill', error });
  }
};

export const deleteSkill = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.skill.delete({
      where: { id }
    });

    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting skill', error });
  }
}; 