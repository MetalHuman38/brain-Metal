"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../utils/models/UserModel"));
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied - No token provided' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log('decoded', decoded);
        const user = await UserModel_1.default.findByPk(decoded.UserID);
        if (user) {
            req.currentUser = { UserID: decoded.UserID };
            ;
        }
        else {
            console.error('user not found');
            res.status(401).send({ error: 'Unauthorized' });
            return;
        }
        req.body = decoded;
        console.log('decoded reqbody', decoded);
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
// export function authenticate(req: Request, res: Response, next: NextFunction) {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ message: 'Access Denied - No token provided' });
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//         req.body = decoded;
//         console.log('decoded', decoded);
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// } 
function authorize(req, res, next) {
    if (req.currentUser?.UserID !== req.body.UserID) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
}
exports.authorize = authorize;
//# sourceMappingURL=authMiddleware.js.map