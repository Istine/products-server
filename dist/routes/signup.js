"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import statements
const express_1 = require("express");
const signin_1 = require("../controllers/signin");
const signup_1 = require("../controllers/signup");
const router = express_1.Router();
//route for singing up
router.post('/', signup_1.validateUser, signup_1.createUser, signin_1.createUserSignature);
module.exports = router;
//# sourceMappingURL=signup.js.map