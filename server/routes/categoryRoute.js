const express = require('express')
const router = express.Router()
const { addCategory, getCategory } = require('../controllers/productController')
const isLogin = require('../middlewares/isLogin')
const isAdmin = require('../middlewares/isAdmin')

router.post('/', isLogin, isAdmin, addCategory)
router.get('/', getCategory)


module.exports = router
// By Asrul Harahap - 2018