import { ControllerFunction } from '@interface/index';
import { Student } from '@models/index';

export const addStudent: ControllerFunction = async (req, res) => {
  try {
    const { rollNumber, password } = req.body;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};
