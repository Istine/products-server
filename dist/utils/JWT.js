"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
//import statement
const jwt = require('jsonwebtoken');
//function to create jwt token
exports.generateAccessToken = (id, email, admin) => {
    const user = {
        id,
        email,
    };
    if (admin) {
        user['admin'] = admin;
    }
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 });
};
//function to create refresh token
exports.generateRefreshToken = (id, email, admin) => {
    const user = {
        id,
        email,
    };
    if (admin) {
        user['admin'] = admin;
    }
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
};
//# sourceMappingURL=JWT.js.map