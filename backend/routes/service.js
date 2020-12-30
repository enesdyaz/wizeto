const express = require('express');
const path = require('path');
const Service = require('../mg-models/service')
const db = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();
//-------------------------------------------------------->





// GET ALL (Service)
router.get('/', async(req, res)=>{
    try{
        const service = await Service.find().sort({_id: 1})
        res.json(service)
    }
    catch(err){
        res.json(err)
    }
})


// GET ONE 
router.get('/:postId', async (req, res)=>{
    try{
        const post = await Post.findById(req.params.postId)
        res.json(post)
    }
    catch(err){
        res.json({message: err})
    }
    
})

// UPDATE $push in Array (Service)
router.put('/:postId', async (req, res)=>{
    try{
        const service = await Service.updateOne({
            _id: req.params.postId
        }, {
            $push: {
                service: {
                    serviceId: req.body.serviceId,
                    categoryId: req.body.categoryId,
                    name: req.body.name, 
                    description: req.body.description,
                    duration: req.body.duration,
                    period: req.body.period,
                    price: req.body.price,
                    image: req.body.image
                }
            }
        }, {returnOriginal: false}
        )
        res.json(req.body)
    }
    catch(err){
        res.json({message: err})
    }
    
})


// POST ONE  // (Add a category )
router.post('/', async (req, res)=>{
    const service = new Service({
        category: req.body.category,
    })

    try{
        const newService = await service.save()
        res.json(newService)
    }
    catch(err){
        res.json({message: err})
    }
})

// DELETE ONE OK (Category)
router.delete('/:postId', async (req, res)=>{
    try{
        const service = await Service.remove({_id: req.params.postId})
        res.json(service)
    }
    catch(err){
        res.json({message: err})
    }
    
})

// DELETE SERVICE (Service)
router.put('/delete/:postId', async (req, res)=>{
console.log('remove', req.body)    
    try{
        const service = await Service.updateOne({_id: req.params.postId}, {$pull: {service: { serviceId: req.body.service_id}}} )
        res.json(service)
    }
    catch(err){
        res.json({message: err})
    }
    
})



module.exports = router;