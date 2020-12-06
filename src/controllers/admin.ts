import { Request, Response } from "express";
const Product = require('../models/product.model')


interface ProductFace {
    id: number
    name: string
    image: string
    price: number
}

type productObj = {
    name: string
    image: string
    price: number
    save: Function
}

interface MulterRequest extends Request {
    file: Express.Multer.File;
}

// middleware for updating products
export const updateProduct = (req: Request, res: Response): Response => {
    try {
        const { name, price, id }: ProductFace = req.body
        console.log((req as MulterRequest).file)
        if (!name || !(req as MulterRequest).file || !price || !id!) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Please fill in all fields."
            })
        }

        Product.findById(id)
            .then((data: productObj) => {
                data['name'] = name
                data['image'] = req.file.filename
                data['price'] = price

                data.save()
                    .then(() => 
                    {
                        return res.status(200).json({
                        success: true,
                        message: "product updated!"
                    })}
                    )
                    .catch((err: Error) => res.status(403).json({
                        success: false,
                        statusCode: 403,
                        message: err.message
                    }))
            })

    }
    catch (err: any) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: err.message
        })
    }
}

//middleware for deleting products
export const deleteProduct = (req: Request, res: Response): Response => {
    try {
        const id: string = req.params['id']
        if (!id) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Please give in id."
            })
        }

        Product.findByIdAndDelete(id)
            .then((): Response => res.status(200).json({
                success: true,
                message: "product deleted!"
            }))
            .catch((err: Error): Response => res.status(500).json({
                success: false,
                statusCode: 500,
                message: err.message
            }))
    }

    catch (err) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: err.message
        })
    }
} 