const mongoose = require('mongoose')
const Schema = mongoose.Schema

let categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be empty']
    },
    product:[{type: Schema.Types.ObjectId, ref: "Product" }]
},{
    timestamps: true
})

let Category = mongoose.model('Category', categorySchema)

module.exports = Category