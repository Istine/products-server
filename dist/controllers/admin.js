"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = void 0;
const Product = require('../models/product.model');
// middleware for updating products
exports.updateProduct = (req, res) => {
    try {
        const { name, price, id } = req.body;
        console.log(req.file);
        if (!name || !req.file || !price || !id) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Please fill in all fields."
            });
        }
        Product.findById(id)
            .then((data) => {
            data['name'] = name;
            data['image'] = req.file.filename;
            data['price'] = price;
            data.save()
                .then(() => {
                return res.status(200).json({
                    success: true,
                    message: "product updated!"
                });
            })
                .catch((err) => res.status(403).json({
                success: false,
                statusCode: 403,
                message: err.message
            }));
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
//middleware for deleting products
exports.deleteProduct = (req, res) => {
    try {
        const id = req.params['id'];
        if (!id) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Please give in id."
            });
        }
        Product.findByIdAndDelete(id)
            .then(() => res.status(200).json({
            success: true,
            message: "product deleted!"
        }))
            .catch((err) => res.status(500).json({
            success: false,
            statusCode: 500,
            message: err.message
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
//# sourceMappingURL=admin.js.map