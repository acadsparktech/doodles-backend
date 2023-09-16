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

export interface AdminUser {
  _id: string;
  email: string;
  name: string;
  password: string;
  role: string;
  restrictions: string[];
  mailToken: string;
  mailOtp: string;
  otpTime: string;
  createdAt: string;
  updatedAt: string;
  csrfToken: string;
  csrfSecret: string;
  status: string;
}

export interface JWTDecoder {
  id: string;
  csrfToken: string;
  exp: string;
}

export interface RequestModified extends express.Request {
  user: {
    _id: string;
    email: string;
    name: string;
    password: string;
    role: string;
    restrictions: string[];
    mailToken: string;
    mailOtp: string;
    otpTime: string;
    createdAt: string;
    updatedAt: string;
    csrfToken: string;
    csrfSecret: string;
    status: string;
  };
}

export interface ModifiedMiddleware {
  (req: express.Request, res: express.Response, next: express.NextFunction): any;
}

export interface MiddlewareFunction {
  (req: express.Request, res: express.Response, next: express.NextFunction): any;
}

export interface ControllerFunction {
  (req: RequestModified, res: express.Response, next?: express.NextFunction): any;
}
