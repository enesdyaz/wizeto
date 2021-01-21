const mongoose = require('mongoose')

const CardsSchema = mongoose.Schema({
    page: Number,
    logo: String,
    title: String,
    subtitle: String,
    buttonName: String,
    description: String,
    addOn: Boolean,
    textAlign: String,
    bgArray: String,
    fontArray: String,
    buttonArray: String,
    sliderFont: Number,
    sliderPadding: Number,
    sliderOpacity: Number,
    sliderLineHeight: Number,
    backgroundImage: String,
    tags: []
})


module.exports = mongoose.model('Cards', CardsSchema)  