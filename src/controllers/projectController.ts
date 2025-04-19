import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { JwtPayload } from '../middlewares/auth';

const prisma = new PrismaClient();

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, startDate, endDate, current, url, githubUrl, images, skills } = req.body;
    const user = (req as any).user as JwtPayload;

    if (!user?.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current,
        url,
        githubUrl,
        images,
        userId: user.userId,
        skills: {
          connect: skills?.map((skillId: string) => ({ id: skillId })) || []
        }
      },
      include: {
        skills: true
      }
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const projects = await prisma.project.findMany({
      where: { userId },
      include: {
        skills: true
      },
      orderBy: { startDate: 'desc' }
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        skills: true
      }
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, startDate, endDate, current, url, githubUrl, images, skills } = req.body;

    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current,
        url,
        githubUrl,
        images,
        skills: {
          set: skills?.map((skillId: string) => ({ id: skillId })) || []
        }
      },
      include: {
        skills: true
      }
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({
      where: { id }
    });

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
}; 