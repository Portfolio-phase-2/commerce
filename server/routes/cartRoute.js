const express = require('express')
const router = express.Router()
const { addToCart, checkout } = require('../controllers/productController')
const isLogin = require('../middlewares/isLogin')

router.post('/', isLogin, addToCart)
router.post('/', isLogin, checkout)

module.exports = router
// By Asrul Harahap - 2018