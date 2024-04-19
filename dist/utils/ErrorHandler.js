"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const app = (0, express_1.default)();
app.use(async (req, res, next) => {
    try {
        const error = (0, http_errors_1.default)(404, 'API route not found');
        throw error;
    }
    catch (err) {
        next(err);
    }
});
app.use(async (err, req, res, next) => {
    try {
        res.status(err.status || 500);
        res.send({
            error: {
                status: err.status || 500,
                message: err.message,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = app;
//# sourceMappingURL=ErrorHandler.js.map