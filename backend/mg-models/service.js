const mongoose = require('mongoose')

const ServiceSchema = mongoose.Schema({
        category: String,
        service: {
            serviceId: Number,
            categoryId: String,
            name: String,
            description: String,
            duration: Number,
            period: Number,
            price: Number,
            image: String
        }
})

module.exports = mongoose.model('Service', ServiceSchema)  