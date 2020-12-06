"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.authenticateToken = exports.createUserSignature = exports.authenticateUser = void 0;
const User = require('../models/user.model');
const JWT_1 = require("../utils/JWT");
const jwt = require('jsonwebtoken');
//setup for redis
const redis = require('redis');
const client = redis.createClient();
let now = new Date();
let jwt_refresh_max_age = now.setDate(now.getDate() + 30);
//uuid import
const { v4: uuidv4 } = require('uuid');
client.on('error', (error) => {
    console.log(error.message);
});
client.on('connect', () => {
    console.log("Redis connection established");
});
//middleware function 
exports.authenticateUser = (req, res, next) => {
    const { email, password } = req.body;
    //check if username and password exists
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: "Please fill in all fields"
        });
    }
    //check if user is in database
    User.find({ email: email, password: password })
        .then((data) => {
        if (data.length > 0) {
            if (data[0].role) {
                req['user'] = data[0].role;
            }
            next(); // call to next middleware function
            return;
        }
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message: "User not found"
        });
    })
        .catch((err) => res.status(500).json({
        success: false,
        statusCode: 500,
        message: err.message
    }));
};
//middleware for creating access token
exports.createUserSignature = (req, res) => {
    let accessID = uuidv4(); // Get access ID
    let refreshID = uuidv4(); //Get refresh ID
    const accessToken = JWT_1.generateAccessToken(accessID, req.body.email, req.user ? req.user : "");
    const refreshToken = JWT_1.generateRefreshToken(refreshID, req.body.email, req.user ? req.user : "");
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.header('Access-Control-Allow-Credentials', "true");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.cookie('accessToken', accessToken, {
    // httpOnly: true,
    // secure: true
    });
    res.cookie('refreshToken', refreshToken, {
    // httpOnly: true,
    // secure: true
    });
    //set data to redis store
    client.set(refreshID, JSON.stringify({
        refreshToken,
        expiration: jwt_refresh_max_age
    }));
    client.print;
    return res.status(201).json({
        success: true,
        message: "Welcome"
    });
};
//middleware for authenticating token
exports.authenticateToken = (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken || null;
        const refreshToken = req.cookies.refreshToken || null;
        if (!accessToken || !refreshToken)
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Unauthorized"
            });
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    let redis_token = client.get(user.id, (err, val) => err ? null : val ? val : null);
                    if (!redis_token || redis_token.refreshToken !== refreshToken) {
                        return res.sendStatus(403).json({
                            message: "NOT ALLOWED!"
                        });
                    }
                    if (redis_token.expiration < new Date()) {
                        // The refresh token is expired
                        let refreshToken = JWT_1.generateRefreshToken(user.id, user.email); //get new refresh token
                        //set refresh token to cookies
                        res.cookie("refreshToken", refreshToken, {
                            httpOnly: true
                        });
                        jwt_refresh_max_age = now.setDate(now.getDate() + 30);
                        client.set(user.id, JSON.stringify({
                            refreshToken,
                            expiration: jwt_refresh_max_age
                        }));
                        client.print;
                    }
                    let accessToken = JWT_1.generateAccessToken(user.id, user.email);
                    res.cookie('accessToken', accessToken, {
                        httpOnly: true
                    });
                    next();
                    return;
                }
            }
            next();
            return;
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: err.message
        });
    }
};
//middleware for logout
exports.logout = (req, res) => {
    try {
        //Delete  user refresh token from redis
        let accessToken = req.cookies.accessToken;
        if (!accessToken)
            return res.sendStatus(400);
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                client.del(user.id);
                return res.status(401).json({
                    success: false,
                    statusCode: "401",
                    message: "Session ended"
                });
            }
        });
        //clear cookies from the browser
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        //return response object
        return res.status(200).json({
            success: true,
            message: "done"
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
//# sourceMappingURL=signin.js.map