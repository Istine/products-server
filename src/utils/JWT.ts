
//import statement
const jwt = require('jsonwebtoken')

type User = {
    id:number
    email:string
    admin?:string
}

//function to create jwt token
export const generateAccessToken = (id:number, email:string, admin?:string):string => {
    const user: User = {
        id,
        email,
    }

    if(admin) {
        user['admin'] = admin
    }

    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 60 * 60})
}

//function to create refresh token
export const generateRefreshToken = (id:number, email:string, admin?:string):string => {

    const user: User = {
        id,
        email,
    }

    if(admin) {
        user['admin'] = admin
    }


    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}
