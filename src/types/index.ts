import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  phoneNumber?: string;
  location?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  id: string;
  headline?: string;
  summary?: string;
  industry?: string;
  yearsOfExp?: number;
  openToWork: boolean;
  currentPosition?: string;
  userId: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description?: string;
  userId: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate?: Date;
  grade?: string;
  activities?: string;
  description?: string;
  userId: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  url?: string;
  githubUrl?: string;
  images: string[];
  userId: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  userId: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuingOrg: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
  userId: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  userId: string;
} 