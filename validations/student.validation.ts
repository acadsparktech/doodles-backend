import { MiddlewareFunction } from '@interface/index';
import isEmpty from 'is-empty';

export const addStudent: MiddlewareFunction = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};
