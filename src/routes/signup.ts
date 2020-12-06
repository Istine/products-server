//import statements
import { Router, Request,Response, NextFunction } from 'express'
import { createUserSignature } from '../controllers/signin'
import { createUser, getUsers, validateUser } from '../controllers/signup'
const router:Router = Router()

//route for singing up
router.post('/', validateUser, createUser, createUserSignature )

module.exports = router