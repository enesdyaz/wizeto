const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
        condition: Boolean,
        date: String,
        day: Number,
            time: [{
                booking: Boolean,
                count: Number,
                customerId: Number,
                hour: String
            }]
})

const bookingSchema = mongoose.Schema({
    arrayDay: [],
    date: String,
    duration: Number, 
    start_time: String,
    finish_time: String,
    period: Number,
    book: [bookSchema]
})




module.exports = mongoose.model('Booking', bookingSchema)  