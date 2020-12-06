//import statements
import { Response, Request, NextFunction } from 'express'
const DBUser = require('../models/user.model')

// User blueprint
interface User {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role:string
}

//middleware function validating user info before creating user
export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { firstname, lastname, email, password }: User = req.body
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: "Please fill in all fields."
        })
    }

    if(password.length < 7 ) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: "Password too short."
        })
    }

    DBUser.find({email})
    .then((user:any) => {
        if(!user.email) {
            next()
            return
        }

        return res.status(400).json({
            success:false,
            statusCode:400,
            message:"User already exists"
        })
    })
}

//middleware function for creating users
export const createUser = (req: Request, res: Response, next:NextFunction):void => {
    const { firstname, lastname, email, password, role }: User = req.body
    const newUser = DBUser({email, password, firstname, lastname,role})
    newUser.save()
        .then(():Response => {
            if(role) {
                req['user'] = role
            }
           next()
           return
        }
        )
        .catch((err: Error):object => res.status(400).json({
            success: false,
            statusCode:400,
            message: err.message
        }))

}

export const getUsers = (req: Request, res: Response, next: NextFunction):void => {
    DBUser.find().then((data: []):object => res.status(200).json({
        success: true,
        data
    }))
}