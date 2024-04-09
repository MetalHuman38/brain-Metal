"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router = express_1.default.Router();
// Enable CORS for all routes
router.use((0, cors_1.default)());
exports.default = router;
//# sourceMappingURL=likesRoutes.js.map