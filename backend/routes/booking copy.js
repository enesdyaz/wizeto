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



router.put('/updateAppointment/:id', async(req, res)=>{
    console.log('updateApp-harry', req.body)
    const pre = await Appointment.findById(req.body.id)
    const preDate = pre.date
    const preTime = pre.time
    console.log(preDate, preTime)

    const newApp = await Booking.findById(req.params.id, function(err,booking){
        console.log(booking)

        const serviceTime = req.body.duration
        const bookingTime = booking.duration
        const rate = Math.ceil(serviceTime/bookingTime)

        const index = booking.book.findIndex(e=>e.date === req.body.date)
        const time = booking.book[index].time
        const timeIndex = booking.book[index].time.findIndex(e=>e.hour === req.body.time)

        console.log('details', index, timeIndex)

        for(var i=0; i< rate;i++){
            if(time[timeIndex + i].count === 0){
                console.log(time['바뀔것', timeIndex + i].booking)
                time[timeIndex + i].booking=true
                time[timeIndex + i].count++
                console.log(time['바뀐것', timeIndex + i].booking)
                
            }else{
                console.log(time['카운트', timeIndex + i].count)

                time[timeIndex + i].count++
                console.log(time['바뀐 카운트', timeIndex + i].count)
            }
        }
        console.log('booking-total=changed', booking)
        booking.save(function (err) {
            if (!err) console.log('Success!');
            res.json({bookingData: booking})
            }); 
    })


})

router.post('/addAppointment/:id', async (req, res)=>{
    console.log('req', req.body)
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

        const newBooking = await Booking.findById(req.params.id, function (err, booking) {

            const serviceTime = req.body.duration
            const bookingTime = booking.duration
            const rate = Math.ceil(serviceTime/bookingTime)

            const index = booking.book.findIndex(e=>e.date === req.body.date)
            const time = booking.book[index].time
            const timeIndex = booking.book[index].time.findIndex(e=>e.hour === req.body.time)

            for(var i=0; i< rate;i++){
                if(time[timeIndex + i].count === 1){
                    console.log(time['바뀔것', timeIndex + i].booking)
                    time[timeIndex + i].booking=false
                    time[timeIndex + i].count--
                    console.log(time['바뀐것', timeIndex + i].booking)
                    
                }else{
                    console.log(time['카운트', timeIndex + i].count)

                    time[timeIndex + i].count--
                    console.log(time['바뀐 카운트', timeIndex + i].count)
                }
            }
            console.log('booking-total=changed', booking)

            booking.save(function (err) {
            if (!err) console.log('Success!');
            res.json({bookingData: booking})
            }); 
    
        })
        
    }
    catch(err){
        res.json({message: err})
    }
})


router.delete('/deleteAppointment/:id', async (req, res)=>{
    console.log('req-harry-delete')
    try{
        const appointment = await Appointment.deleteOne({_id: req.params.id})
        res.json(appointment)
    }
    catch(err){
        res.json({message: err})
    }
    
})


module.exports = router;