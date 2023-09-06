import express from 'express';

const xssMiddleware = (req: express.Request, res: express.Response, next: any) => {
  res.header('X-XSS-Protection', '0');
  next();
};

export default xssMiddleware;
