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
exports.getUserInfo = exports.signin = void 0;
const admin_1 = __importDefault(require("@models/admin"));
const validatePassword_1 = __importDefault(require("@utils/validatePassword"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("@config/index"));
const uuid_1 = require("uuid");
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let adminAccount = yield admin_1.default.findOne({ email });
        if (!adminAccount) {
            return res.status(400).json({ success: false, message: 'Admin not found' });
        }
        if (!(0, validatePassword_1.default)(password, adminAccount.password)) {
            return res.status(400).json({ success: false, message: 'Incorrect password' });
        }
        if (adminAccount.status === 'locked') {
            return res.status(400).json({ success: false, message: 'Your account has been locked' });
        }
        // Place a request here to our server to avoid software theft
        let token = (0, uuid_1.v4)();
        res.setHeader('X-CSRF-TOKEN', token);
        let jwtToken = jsonwebtoken_1.default.sign({
            id: adminAccount._id.toString(),
            csrfToken: token,
            exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
        }, index_1.default.JWT_SECRET);
        return res.status(201).json({ success: true, message: 'Signin successful', action: 'FETCH_ACCOUNT', token: `Bearer ${jwtToken}` });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong' });
    }
});
exports.signin = signin;
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield admin_1.default.findById(req.user._id, { name: 1, role: 1, status: 1, email: 1 });
        return res.json({ success: true, user });
    }
    catch (error) {
        console.log('getUserInfo', error);
        return res.status(500).json({ success: false, message: 'Something went wrong' });
    }
});
exports.getUserInfo = getUserInfo;
