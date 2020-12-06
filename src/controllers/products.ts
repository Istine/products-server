//import statements
import { Request, Response, NextFunction, Express} from 'express'
import { Multer } from 'multer'
const multer = require('multer')
const Product = require('../models/product.model')

//Alias for products
type ProductAlias = {
    name:string
    image:any
    price:number
}

interface MulterRequest extends Request {
    file: Express.Multer.File;
}

//middleware for adding products
export const addProducts = (req:Request , res:Response):Response => {
    try {
        const { name, price } = req.body
        if(!name || !price || !(req as MulterRequest).file) {
            return res.status(400).json({
                success:false,
                statusCode:400,
                message:"Please fill in all fields."
            })
        }


        const productObj:any = Product({
            name,
            price:Number(price),
            image:req.file.filename
        })
        productObj.save()
        .then(():Response => res.status(201).json({
            success:true,
            message:"product added successfully"
        }))
        .catch((err:Error):Response => res.status(500).json({
            success:false,
            statusCode:500,
            message: "Duplicate entry name"
        }))

    }
    catch(err:any) {
        return res.status(500).json({
            success:false,
            statusCode:500,
            message:err.message
        })
    }
}


//middleware for getting all products
export const allProducts = (req:Request, res:Response) => {
 Product.find().then((data: object[]) => res.status(200).json({
     success:true,
     message:"Done",
     data
 }))
 .catch((err:Error) => res.status(400).json({
     success:false,
     statusCode:400,
     message:err.message
 }))   
}