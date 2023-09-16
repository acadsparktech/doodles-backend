import csrf from 'csrf';

const CSRF = new csrf();

export const createCSRFToken = () => {
  let secret = CSRF.secretSync();
  let token = CSRF.create(secret);
  return { token, secret };
};

export const verifyCSRFToken = (secret: string, token: string): boolean => {
  let verify = CSRF.verify(secret, token);
  return verify;
};
