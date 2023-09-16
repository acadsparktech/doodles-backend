"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = void 0;
const is_empty_1 = __importDefault(require("is-empty"));
const signin = (req, res, next) => {
    try {
        let { email, password } = req.body;
        let errors = {};
        if ((0, is_empty_1.default)(email.trim()))
            errors.email = 'Email cannot be empty';
        if ((0, is_empty_1.default)(password.trim()))
            errors.password = 'Password cannot be empty';
        if (!(0, is_empty_1.default)(errors)) {
            return res.status(400).json({ success: false, errors, message: 'Invalid signin parameters' });
        }
        else {
            return next();
        }
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};
exports.signin = signin;
