const express = require('express')
const router = express.Router()
const upload = require('../helpers/uploadHelper')
const { addProduct, getProducts, deleteProduct } = require('../controllers/productController')
const isLogin = require('../middlewares/isLogin')
const isAdmin = require('../middlewares/isAdmin')

router.post('/', isLogin, isAdmin, upload.multer.single('image'), upload.sendUploadToGCS, addProduct)
router.get('/', getProducts)
router.delete('/:id', isLogin, isAdmin, deleteProduct)

module.exports = router
// By Asrul Harahap - 2018