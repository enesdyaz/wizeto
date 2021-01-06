const express = require('express');
const multer = require('multer');
const path = require('path');
const Service = require('../mg-models/service')
const db = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();
//-------------------------------------------------------->
// MONGO DB 
//-------------------------------------------------------->


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
// GET ALL

router.get('/', async(req, res)=>{
    try{
        const service = await Service.find().sort({_id:-1})
        res.json(service)
    }
    catch(err){
        res.json(err)
    }
})


// POST CATEGORY
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
// UPDATE CATEGORY
router.put('/:id', async(req,res)=>{
    try{
        console.log(req.body)
        const service = await Service.updateOne({_id: req.params.id}, {$set: { category: req.body.category }})
        res.json(service)
    }
    catch(err){
        res.json({message: err})
    }
})
// DELETE CATEGORY
router.delete('/:id', async (req, res)=>{
    try{
        const service = await Service.remove({_id: req.params.id})
        res.json(service)
    }
    catch(err){
        res.json({message: err})
    }
    
})





// ADD SERVICE
router.put('/addService/:postId', async (req, res)=>{
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
router.put('/updateService/:id', async(req, res)=>{
    try{
        console.log('UPDATE 시작하기', req.body)
        const service = Service.findById(req.params.id, function (err, service) {
            if (!err) {
                const newService = service.item.id(req.body.sid)
                    newService.serviceId= req.body.id
                    newService.categoryId= req.body.parent_id
                    newService.name= req.body.name
                    newService.description= req.body.description
                    newService.duration= req.body.duration
                    newService.price= req.body.price
                    newService.image= req.body.image

                service.save(function (err) {
                    if (!err) console.log('Success!');
                    res.json(newService)
                    });
                }
            });
        
    }
    catch(err){
        res.json(err)
    }
})

// router.put('/updateService/:id', async (req, res)=>{
//     try{
//         console.log('update yes', req.body)
//         const service = await Service.updateOne({
//             _id: req.params.id
//         }, {
//             $set: {
//                 item: {
//                     serviceId: req.body.id,
//                     categoryId: req.body.parent_id,
//                     name: req.body.name, 
//                     description: req.body.description,
//                     duration: req.body.duration,
//                     price: req.body.price,
//                     image: req.body.image
//                 }
//             }
//         }, 
//         )
//         res.json(service)
//     }
//     catch(err){
//         res.json({message: err})
//     }
// })
// DELETE SERVICE (Service)
router.put('/deleteService/:id', async (req, res)=>{
    try{
        const service = await Service.updateOne(
            {_id: req.body.category_id}, 
            {$pull: 
                {item: 
                    { serviceId: req.body.service_id}
                }
            })
        res.json(service)
    }
    catch(err){
        res.json({message: err})
    }
})


//IMAGE - MYSQL DB
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
        done(null, 'uploads');
        },
        filename(req, file, done) {
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext); // 제로초.png, basename = 제로초, ext = .png
        done(null, basename + Date.now() + ext);
        },
    }),
    limit: { fileSize: 5 * 1024 * 1024 },
});

router.post('/uploadImage', upload.array('image'), (req, res, next) => {
    res.json(req.files.map(v => v.filename));
});


module.exports = router;