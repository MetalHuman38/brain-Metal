"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whiteList = [
    'https://www.example.com',
    'http://localhost:3000/api',
    'http://localhost:3000',
    'http://localhost:3001',
];
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not Allowed by Cors'), undefined);
        }
    },
    optionSuccessStatus: 200,
};
exports.default = { corsOptions };
//# sourceMappingURL=corsOption.js.map