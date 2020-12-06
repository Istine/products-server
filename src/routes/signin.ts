//import statements
const express = require('express')
const router = express.Router()

import { authenticateUser, createUserSignature, logout } from '../controllers/signin'

//route for handling login
router.post('/', authenticateUser, createUserSignature)

//route for logging out
router.get('/logout', logout)

module.exports = router