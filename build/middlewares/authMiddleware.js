"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("@config/index"));
const admin_1 = __importDefault(require("@models/admin"));
const is_empty_1 = __importDefault(require("is-empty"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let authToken = req.headers['authorization'];
        if (!authToken) {
            return res.status(401).json({ success: false, message: 'Unauthorized', state: 'UNAUTHORIZED' });
        }
        if (!authToken.startsWith('Bearer')) {
            return res.status(401).json({ success: false, message: 'Invalid authorization', state: 'UNAUTHORIZED' });
        }
        authToken = authToken.split(' ')[1].trim();
        let decodedJwt = jsonwebtoken_1.default.verify(authToken, index_1.default.JWT_SECRET, { algorithms: ['HS256'] });
        let user = (yield admin_1.default.findById(decodedJwt.id).lean());
        if (user.status == 'locked') {
            return res.status(403).json({ success: false, message: 'Your account has been locked', state: 'UNAUTHORIZED' });
        }
        req.user = user;
        if ((0, is_empty_1.default)(req.user)) {
            return res.status(403).json({ success: false, message: 'No Administrator found' });
        }
        return next();
    }
    catch (error) {
        console.log('authMiddleware', error);
        return res.status(401).json({ success: false, state: 'UNAUTHORIZED', message: 'Please login to continue' });
    }
});
exports.default = authMiddleware;
