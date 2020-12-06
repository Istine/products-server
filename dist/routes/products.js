"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multer = void 0;
//import statements
const express = require('express');
const router = express.Router();
const signin_1 = require("../controllers/signin");
const products_1 = require("../controllers/products");
const path = require('path');
exports.multer = require('multer');
let storage = exports.multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let uploads = exports.multer({ storage });
// route for getting all products
router.get('/', signin_1.authenticateToken, products_1.allProducts);
//route for adding products
router.post('/add', signin_1.authenticateToken, uploads.single('image'), products_1.addProducts);
module.exports = router;
//# sourceMappingURL=products.js.map