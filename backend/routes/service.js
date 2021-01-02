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
        const service = await Service.find()
        res.json(service)
    }
    catch(err){
        res.json(err)
    }
})
// router.get('/', async(req, res)=>{
//     try{
//         const service = await Service.find().sort({_id: -1})
//         res.json(service)
//     }
//     catch(err){
//         res.json(err)
//     }
// })


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

router.put('/update',  async(req, res)=>{
    try{
        console.log('update service', req.body)
        const service = await Service.updateOne(
            {_id: req.body.parent_id, service: { $elemMatch: {serviceId: req.body.id}}}, 
            {$set: {  
                "service.1.name" : req.body.name, 
                "service.1.description" : req.body.description, 
                "service.1.duration" : req.body.duration, 
                "service.1.image" : req.body.image, 
                "service.1.price" : req.body.price
            }} 
            )

        // const service = await Service.updateOne({},  {$set: { "service.$[elem].name" : req.body.name }}, 
        // { arrayFilters: [ { "service.serviceId": req.body.id ], multi: true }
        // )
        res.json(service)
    }
    catch(err){
        res.json({message: err})
    }
})

// router.put('/update/:id', async(req,res)=>{
//     try{
//         console.log(req.body)
//         const service = await Service.updateOne({_id: req.params.id}, {$set: { category: req.body.category }})
//         res.json(service)
//     }
//     catch(err){
//         res.json({message: err})
//     }
// })

// UPDATE $push in Array (Service)
router.put('/:postId', async (req, res)=>{
    try{

        const service = await Service.updateOne({
            _id: req.params.postId
        }, {
            $push: {
                item: {
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

//UPDATE SERVICE
router.put('/update/:id', async (req, res)=>{
    try{
        console.log('update yes', req.body)
        const service = await Service.updateOne({
            _id: req.params.id
        }, {
            $set: {
                item: {
                    serviceId: req.body.id,
                    categoryId: req.body.parent_id,
                    name: req.body.name, 
                    description: req.body.description,
                    duration: req.body.duration,
                    price: req.body.price,
                    image: req.body.image
                }
            }
        }, {returnOriginal: false}
        )
        res.json(service)
    }
    catch(err){
        res.json({message: err})
    }
    
})


// POST ONE  // (Add a category )
router.post('/', async (req, res)=>{
    const service = new Service({
        category: req.body.category,
        toggle: req.body.toggle
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
router.put('/delete/:id', async (req, res)=>{
    console.log('delete service', req.body)
    try{
        // const service = await Service.item.id(req.body.sid).remove()
        const service = await Service.updateOne({_id: req.body.category_id}, {$pull: {item: { serviceId: req.body.service_id}}} )
        res.json(service)
    }
    catch(err){
        res.json({message: err})
    }
    
})



module.exports = router;