"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.createUser = exports.validateUser = void 0;
const DBUser = require('../models/user.model');
//middleware function validating user info before creating user
exports.validateUser = (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: "Please fill in all fields."
        });
    }
    if (password.length < 7) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: "Password too short."
        });
    }
    DBUser.find({ email })
        .then((user) => {
        if (!user.email) {
            next();
            return;
        }
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: "User already exists"
        });
    });
};
//middleware function for creating users
exports.createUser = (req, res, next) => {
    const { firstname, lastname, email, password, role } = req.body;
    const newUser = DBUser({ email, password, firstname, lastname, role });
    newUser.save()
        .then(() => {
        if (role) {
            req['user'] = role;
        }
        next();
        return;
    })
        .catch((err) => res.status(400).json({
        success: false,
        statusCode: 400,
        message: err.message
    }));
};
exports.getUsers = (req, res, next) => {
    DBUser.find().then((data) => res.status(200).json({
        success: true,
        data
    }));
};
//# sourceMappingURL=signup.js.map