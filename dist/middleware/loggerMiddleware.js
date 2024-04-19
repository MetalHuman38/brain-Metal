"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
function logger(req, res, next) {
    console.log('Request URL:', req.originalUrl);
    console.log('Request Type:', req.method);
    console.log('Request IP:', req.ip);
    console.log('Request Time:', new Date());
    next();
}
exports.logger = logger;
//# sourceMappingURL=loggerMiddleware.js.map