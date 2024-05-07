"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserModel_1 = __importDefault(require("../utils/models/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.use((0, cors_1.default)());
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
// Define a route to fetch user data
router.get('/currentUser', async (req, res) => {
    try {
        // verify the token
        const token = req.headers.authorization?.split(' ')[1]; // Add a check for undefined
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, 'metal ninja secret');
            const user = await UserModel_1.default.findByPk(decoded.UserID);
            if (user) {
                req.currentUser = user;
            }
            else {
                console.error('user not found');
                res.status(401).send({ error: 'Unauthorized' });
                return;
            }
        }
        const userId = req.body; // Convert userId to a number
        const user = await UserModel_1.default.findOne(userId);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=userRoutes.js.map