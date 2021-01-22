const express = require('express');
const multer = require('multer');
const path = require('path');
const Cards = require('../mg-models/cards')
const PhoneView = require('../mg-models/phoneView')
const db = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
        done(null, 'uploads/cards');
        },
        
        filename(req, file, done) {
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext); // white sand.png,  png를 제거 하는 것 -> white sand 가 됨
        var trimName = basename.replace(/(\s*)/g, "")   // 빈 공백 제거
        done(null, trimName + Date.now() + ext);
        },
    }),
    limit: { fileSize: 5 * 1024 * 1024 },
});

router.post('/uploadImage', upload.array('image'), (req, res, next) => {
    console.log('req-files', req.files, 'req-body', req.body)
    res.json(req.files.map(v => v.filename));
});



router.post('/addCards', async (req, res)=>{
    console.log('addCards', req.body)
    const cards = new Cards(req.body)
    try{
        const newCards = await cards.save()
        res.json(newCards)
    }
    catch(err){
        console.log(err)
        res.json({message: err}) 
    }
})
router.put('/updateCards', async (req, res)=>{
    try{
        console.log('req-body', req.body)
        const newCards = await Cards.findOneAndUpdate({page: req.body.page}, req.body)
        console.log('newCards', newCards)
        return res.json(newCards)
    }
    catch(err){
        return res.json({message: err}) 
    }
})

router.get('/fetchData', async (req, res)=>{
    const cards = await Cards.find()
    const phoneView = await PhoneView.find()
    console.log('cards', cards)
    res.json({cards: cards, phoneView: phoneView})
})

router.delete('/removeCards/:id', async(req, res)=>{
    const cards = await Cards.findOneAndRemove({page: req.params.id})
    res.json(cards)
})


// PhoneView

router.put('/updatePhoneView', async(req, res)=>{
    console.log('updatePhoneView', req.body)
    const view = new PhoneView(req.body)

    try{
        const removeView = await PhoneView.remove({})
        const newView = await view.save(req.body)  
        res.json(newView)
    }
    catch(err){
        console.log(err)
        res.json({message: err}) 
    } 
})



module.exports = router;