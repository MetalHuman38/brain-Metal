"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
function logger(req, res, next) {
    console.log('Request URL:', req.originalUrl);
    console.log('Request Type:', req.method);
    next();
}
exports.logger = logger;
//# sourceMappingURL=loggerMiddleware.js.map