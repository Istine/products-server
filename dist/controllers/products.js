"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allProducts = exports.addProducts = void 0;
const multer = require('multer');
const Product = require('../models/product.model');
//middleware for adding products
exports.addProducts = (req, res) => {
    try {
        const { name, price } = req.body;
        if (!name || !price || !req.file) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Please fill in all fields."
            });
        }
        const productObj = Product({
            name,
            price: Number(price),
            image: req.file.filename
        });
        productObj.save()
            .then(() => res.status(201).json({
            success: true,
            message: "product added successfully"
        }))
            .catch((err) => res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Duplicate entry name"
        }));
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: err.message
        });
    }
};
//middleware for getting all products
exports.allProducts = (req, res) => {
    Product.find().then((data) => res.status(200).json({
        success: true,
        message: "Done",
        data
    }))
        .catch((err) => res.status(400).json({
        success: false,
        statusCode: 400,
        message: err.message
    }));
};
//# sourceMappingURL=products.js.map