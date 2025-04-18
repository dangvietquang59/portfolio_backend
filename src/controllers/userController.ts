import { PrismaClient } from '@prisma/client';
import { IRequest, IResponse } from '../types';

const prisma = new PrismaClient();

export const userController = {
  async getAllUsers(_req: IRequest, res: IResponse) {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  },

  async createUser(req: IRequest, res: IResponse) {
    try {
      const { email, name } = req.body;
      const user = await prisma.user.create({
        data: {
          email,
          name,
        },
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  },
}; 