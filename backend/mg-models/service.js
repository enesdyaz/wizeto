const mongoose = require('mongoose')

const ItemSchema = mongoose.Schema({
    serviceId: Number,
    categoryId: String,
    name: String,
    description: String,
    duration: Number,
    price: Number,
    image: String
})

const ServiceSchema = mongoose.Schema({
        category: String,
        toggle: Boolean,
        item: [ItemSchema]
})


module.exports = mongoose.model('Service', ServiceSchema)  