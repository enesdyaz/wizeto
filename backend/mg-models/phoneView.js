const mongoose = require('mongoose')

const PhoneViewSchema = mongoose.Schema({
    name: String,
    components: []
})


module.exports = mongoose.model('PhoneView', PhoneViewSchema)  