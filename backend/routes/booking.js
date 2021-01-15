const express = require('express');
const path = require('path');
const Booking = require('../mg-models/booking')
const Appointment = require('../mg-models/appointment')
const db = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();
//-------------------------------------------------------->
// BOOKING
//-------------------------------------------------------->

// GET BOOKING
router.get('/', async(req, res)=>{
    try{
        const booking = await Booking.find().sort({_id:-1})
        res.json(booking)
    }
    catch(err){
        res.json(err)
    }
})

// POST BOOKING
router.post('/addBooking', async (req, res)=>{
    console.log('harry-req', req.body)
    const booking = new Booking({
        period: req.body.peirod,
        duration: req.body.duration,
        arrayDay: req.body.arrayDay,
        start_time: req.body.start_time,
        finish_time: req.body.finish_time,
        book: req.body.book
        
    })

    try{
        const newService = await booking.save()
        res.json(newService)
    }
    catch(err){
        res.json({message: err})
    }
})

// UPDATE BOOKING
router.put('/updateBooking/:id', async(req,res)=>{

    try{
        console.log('update-booking', req.body)
        const booking = await Booking.findOneAndReplace({_id: req.params.id}, {
            period: req.body.peirod,
            duration: req.body.duration,
            arrayDay: req.body.arrayDay,
            start_time: req.body.start_time,
            finish_time: req.body.finish_time,
            book: req.body.book
        })
        res.json(booking)
    }
    catch(err){
        res.json({message: err})
    }
})
// DELETE BOOKING
router.delete('/', async (req, res)=>{
    try{
        const booking = await Booking.remove()
        res.json(booking)
    }
    catch(err){
        res.json({message: err})
    }
    
})


//-------------------------------------------------------->
// APPOINTMENT
//-------------------------------------------------------->
// GET APPOINTMENT
router.get('/getAppointment', async(req, res)=>{
    try{
        const appointment = await Appointment.find().sort({_id:-1})
        res.json(appointment)
    }
    catch(err){
        res.json(err)
    }
})
// POST APPOINTMENT
router.post('/addAppointment', async (req, res)=>{
    console.log('harry-req', req.body)
    const appointment = new Appointment({
        date: req.body.date,
        time: req.body.time,
        start: req.body.start, 
        end: req.body.end,
        service: req.body.service,
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        color: req.body.color,
        duration: req.body.duration,
        price: req.body.price
    })

    try{
        const newAppointment = await appointment.save()
        res.json(newAppointment)
    }
    catch(err){
        res.json({message: err})
    }
})
module.exports = router;