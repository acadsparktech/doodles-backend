"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCSRFToken = exports.createCSRFToken = void 0;
const csrf_1 = __importDefault(require("csrf"));
const CSRF = new csrf_1.default();
const createCSRFToken = () => {
    let secret = CSRF.secretSync();
    let token = CSRF.create(secret);
    return { token, secret };
};
exports.createCSRFToken = createCSRFToken;
const verifyCSRFToken = (secret, token) => {
    let verify = CSRF.verify(secret, token);
    return verify;
};
exports.verifyCSRFToken = verifyCSRFToken;
