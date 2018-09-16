const express = require('express')
const router = express.Router()
const { addToCart, removefromCart, checkout } = require('../controllers/productController')
const {getOne} = require('../controllers/userController')
const isLogin = require('../middlewares/isLogin')

router.get('/', isLogin, getOne)
router.post('/', isLogin, addToCart)
router.put('/', isLogin, removefromCart)
router.post('/', isLogin, checkout)

module.exports = router
// By Asrul Harahap - 2018