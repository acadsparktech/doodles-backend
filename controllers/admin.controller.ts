import { RequestModified } from '@interface/index';
import express from 'express';

export const signin = async (req: RequestModified, res: express.Response) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};
