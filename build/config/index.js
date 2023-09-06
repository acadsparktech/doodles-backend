"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let config = {
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
}
else {
    console.log('\x1b[35m%s\x1b[0m', `Development Server`);
    const PORT = process.env.PORT;
    const API_URL = `http://localhost:${PORT}`;
    config = {
        API_URL,
        PORT,
        ADMIN_URL: 'http://localhost:3000',
        DATABASE_URI: process.env.MONGO_URI,
        JWT_SECRET: process.env.JWT_SECRET,
        IMAGE: {},
        FILES: {},
    };
}
exports.default = config;
