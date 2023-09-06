"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xssMiddleware = (req, res, next) => {
    res.header('X-XSS-Protection', '0');
    next();
};
exports.default = xssMiddleware;
