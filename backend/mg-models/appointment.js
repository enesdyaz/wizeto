const mongoose = require('mongoose')


const AppointmentSchema = mongoose.Schema({
        date: String,
        time: String,
        start: String, 
        end: String,
        service: String,
        name: String,
        email: String,
        mobile: String,
        color: String,
        duration: Number,
        price: Number
})


module.exports = mongoose.model('Appointment', AppointmentSchema)  