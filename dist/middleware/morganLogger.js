"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
(0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms');
(0, morgan_1.default)(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ');
});
(0, morgan_1.default)('combined', {
    skip: function (req, res) { return res.statusCode < 400; }
});
(0, morgan_1.default)('tiny', {
    skip: function (req, res) { return res.statusCode >= 400; }
});
exports.default = morgan_1.default;
//# sourceMappingURL=morganLogger.js.map