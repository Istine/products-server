"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const signin_1 = require("../controllers/signin");
const admin_1 = require("../controllers/admin");
const path = require('path');
const multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let uploads = multer({ storage });
//route for updating products
router.post('/update', signin_1.authenticateToken, uploads.single('image'), admin_1.updateProduct);
//route for deleting products
router.get('/:id', signin_1.authenticateToken, admin_1.deleteProduct);
module.exports = router;
//# sourceMappingURL=admin.js.map