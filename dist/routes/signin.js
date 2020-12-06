"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import statements
const express = require('express');
const router = express.Router();
const signin_1 = require("../controllers/signin");
//route for handling login
router.post('/', signin_1.authenticateUser, signin_1.createUserSignature);
//route for logging out
router.get('/logout', signin_1.logout);
module.exports = router;
//# sourceMappingURL=signin.js.map