const express = require('express');
const path = require('path');
const Service = require('../mg-models/service')
const db = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();
//-------------------------------------------------------->





// GET ALL
router.get('/', async(req, res)=>{
    try{
        const service = await Service.find()
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

// DELETE ONE
router.delete('/:postId', async (req, res)=>{
    try{
        const post = await Post.remove({_id: req.params.postId})
        res.json(post)
    }
    catch(err){
        res.json({message: err})
    }
    
})


// UPDATE $push in Array
router.put('/:postId', async (req, res)=>{
    console.log('harry-body', req.body)
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


// POST ONE  // category 
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



module.exports = router;