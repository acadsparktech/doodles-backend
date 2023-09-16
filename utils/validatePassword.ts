import bcrypt from 'bcryptjs';

const validatePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export default validatePassword;
