const Product = require('../models/Product')
const Category = require('../models/Category')
const User = require('../models/User')

module.exports = {

	// product management
	addProduct: (req, res) => {
        Category.findOne({name: req.body.category})
		.then((resCategory) => {
			if(resCategory == null) res.status(500).json({message: 'category not found'})

			let newProduct = {
				name: req.body.name,
				price: parseInt(req.body.price),
				stock: parseInt(req.body.stock),
				image: req.file.cloudStoragePublicUrl,
				category: resCategory._id
			}
			
			Product.create(newProduct)
			.then((response) => res.status(201).json({response}) )
			.catch((err) => res.status(500).json(err))
		})
		.catch((err) => res.status(500).json(err)) 
    },
    
	getProducts: (req, res) => {
		Product.find()
		.populate('category')
    	.then((response) => res.status(200).json(response))
		.catch((err) => res.status(500).json(err))
    },

    deleteProduct: (req, res) => {
		Product.deleteOne({_id: req.params.id})
		.then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err))
	},

	searchProductByCategory: (req, res) => {
		Product.find({category: req.params.category})
		.populate('category')
		.then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err))
	}, 

	searchProductByName: (req, res) => {
		Product.find({name: { $regex: req.params.search, $options: 'i' } })
		.populate('category')
		.then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err))
	},
	
	// category management
	addCategory: (req, res) => {
		let newCategory = {
			name: req.body.name,
			orders: []
		}
        Category.create(newCategory)
		.then((response) => res.status(201).json(response))
		.catch((err) => res.status(500).json(err))
    },
    
	getCategory: (req, res) => {
		Category.find()
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err))
    },
	
	
	// cart management
	addToCart: (req, res) => {
		let userId = req.decoded.id
		let updateData = {
			$push: {cart: req.body.orderid},
			updatedAt: new Date()
		}
		User.findOneAndUpdate({_id: userId}, updateData)
		.then((user) => {
			if(user === null) {
                res.status(500).json('user not found')
            } else {
                res.status(201).json("success to add cart")
            }
        })
        .catch((err) => res.status(500).json(err))   
	},
	
	removefromCart: (req, res) => {
		let userId = req.decoded.id
		let updateData = {
			$pull: {cart: req.body.orderid},
			updatedAt: new Date()
		}
		User.findOneAndUpdate({_id: userId}, updateData)
		.then((user) => {
			if(user === null) {
                res.status(500).json('user not found')
            } else {
                res.status(201).json("success to remove from cart")
            }
        })
        .catch((err) => res.status(500).json(err))   
    },
       
	checkout: (req, res) => {
		req.body.updateProducts.forEach(element => {
			Product.findOne({_id: element._id})
			.then((product) => {
			    let updateData = {
					updatedAt: new Date,
					stock: product.stock - element.stock
				}
                
                if(updateData.stock > 0){
					Product.update(updateData)
                    .then((response) => res.status(200).json(response))
                    .catch((err) => res.status(500).json(err))
				} else {
					Product.remove({_id: element._id})
					.then((response) => res.status(200).json(response))
                    .catch((err) => res.status(500).json(err))
				}
			})
			.catch((err) => res.status(500).json(err))
        })
    }
    
	
}