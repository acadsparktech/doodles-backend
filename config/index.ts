import { ServerConfig } from "@interface/index";

let config: ServerConfig = {
  API_URL: '',
  PORT: '',
  ADMIN_URL: '',
  DATABASE_URI: '',
  JWT_SECRET: '',
  FILES: {},
  IMAGE: {}
};

if (process.env.NODE_ENV === 'production') {
  console.log('\x1b[35m%s\x1b[0m', `Live Server`);
  config = {
    API_URL: '',
    PORT: '',
    ADMIN_URL: '',
    DATABASE_URI: '',
    JWT_SECRET: '',
    FILES: {},
    IMAGE: {}
  };
} else {
  console.log('\x1b[35m%s\x1b[0m', `Development Server`);
  const PORT = process.env.PORT as string;
  const API_URL = `http://localhost:${PORT}`;
  config = {
    API_URL,
    PORT,
    ADMIN_URL: 'http://localhost:3000',
    DATABASE_URI: process.env.MONGO_URI as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    IMAGE: {},
    FILES: {},
  };
}

export default config;
