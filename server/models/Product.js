const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be empty']
    },
    stock: {
        type: Number,
        required: [true, 'Stock cannot be empty'] 
    },
    price: {
      type: Number,
      required: [true, 'price cannot be empty'] 
    },
    image: {
      type: String,
    },
    category: {
			type: Schema.Types.ObjectId,
			ref: "Category"
    },
},{
    timestamps: true
})

productSchema.pre('save', function(next){	
	this.model('Category').update(   
		{_id:  {$in: this.category}}, 
		{$push: {product: this._id}}, 
		{multi: true},
		next
	)
});

productSchema.pre('remove', function(next){
  this.model('Category').update(
    {_id:  this.category}, 
    {$pull: {product: this._id}}, 
    {multi: true},
    next
  )
});

let Product = mongoose.model('Product', productSchema)

module.exports = Product