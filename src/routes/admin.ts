const express  = require('express')
const router = express.Router()
import { authenticateToken } from '../controllers/signin'
import { deleteProduct, updateProduct } from "../controllers/admin";

const path = require('path')

const multer = require('multer')
let storage = multer.diskStorage({
    destination: function (req:Request, file:any, cb:any) {
      cb(null, path.join(__dirname, '/../uploads'))
    },
    filename: function (req:Request, file:any, cb:any) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

let uploads = multer({storage})

//route for updating products
router.post('/update', authenticateToken, uploads.single('image'), updateProduct)


//route for deleting products
router.get('/:id', authenticateToken, deleteProduct)

module.exports = router