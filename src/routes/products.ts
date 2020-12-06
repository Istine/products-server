//import statements
const express = require('express')
const router = express.Router()
import {Request} from 'express'
import { authenticateToken } from '../controllers/signin'
import { addProducts, allProducts } from '../controllers/products'

const path = require('path')

export const multer = require('multer')
let storage = multer.diskStorage({
    destination: function (req:Request, file:any, cb:any) {
      cb(null, path.join(__dirname, '/../uploads'))
    },
    filename: function (req:Request, file:any, cb:any) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

let uploads = multer({storage})

// route for getting all products
router.get('/', authenticateToken, allProducts)

//route for adding products
router.post('/add', authenticateToken, uploads.single('image'), addProducts)

module.exports = router