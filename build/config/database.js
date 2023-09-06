"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("@config/index"));
const databaseConnection = (cb) => {
    mongoose_1.default
        .connect(index_1.default.DATABASE_URI)
        .then(() => {
        console.log('\x1b[34mDatabase Connection Successful');
        return cb(true);
    })
        .catch((err) => {
        console.error(err);
        setTimeout(() => {
            databaseConnection(cb);
        }, 1000);
    });
};
exports.default = databaseConnection;
