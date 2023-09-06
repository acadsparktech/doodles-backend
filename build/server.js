"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import NPM Modules
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const frameguard_1 = __importDefault(require("frameguard"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const ip_1 = __importDefault(require("ip"));
// Custom Written Modules
const database_1 = __importDefault(require("@config/database"));
const accessControl_1 = __importDefault(require("@middlewares/accessControl"));
const xssMiddleware_1 = __importDefault(require("@middlewares/xssMiddleware"));
const index_1 = __importDefault(require("@config/index"));
const admin_routes_1 = __importDefault(require("@routes/admin.routes"));
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(accessControl_1.default);
app.use((0, cors_1.default)({ origin: '*' }));
app.use(xssMiddleware_1.default);
app.use((0, frameguard_1.default)({ action: 'sameorigin' }));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static('./public'));
let myip = ip_1.default.address();
console.log(`IP : ${myip}`);
let server = http_1.default.createServer(app);
app.get('/test', (req, res) => {
    return res.json({ success: true, message: 'Server runs successfully' });
});
app.use('/api/admin', admin_routes_1.default);
(0, database_1.default)((isConnected) => {
    if (isConnected) {
        server.listen(index_1.default.PORT, () => {
            console.log(`\x1b[33mServer runs in port ${index_1.default.PORT}...`);
        });
    }
});
