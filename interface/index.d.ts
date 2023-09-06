import express from 'express';
import Admin from '@models/admin';
export interface ServerConfig {
  API_URL: string;
  PORT: string;
  ADMIN_URL: string;
  DATABASE_URI: string;
  JWT_SECRET: string;
  IMAGE: object;
  FILES: object;
}

export interface RequestModified extends express.Request {
  user: {
    email: string;
    name: string;
    password: string;
    role: string;
    mailToken: string;
    mailOtp: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ModifiedMiddleware {
  (req: express.Request, res: express.Response, next: express.NextFunction):void
}
