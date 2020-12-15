const express = require('express');
const multer = require('multer');
const path = require('path');
const passport = require('passport');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();



//----------------------------------------------
// TEXT 
//----------------------------------------------
router.post('/text',async(req, res, next)=>{
    try{
        console.log(req.body)
        const newText = await db.Text.create({
            text:req.body.text
        })
        res.json(newText)
    }catch(err){
        console.log(err)
    }
})

router.get('/loadText',async(req, res, next)=>{
    try{
        const newText = await db.Text.findAll()
        res.json(newText)
    }catch(err){
        console.log(err)
    }
})

//----------------------------------------------
// GET 
//----------------------------------------------

router.get('/loadTextImage', async(req, res, next)=>{    
    try{
        const textImage = await db.TextImage.findAll({
            include: [{model: db.User, attributes: ['id', 'username', 'email']}, {model: db.Image}],
            order: [['createdAt', 'DESC'], ['updatedAt','ASC']],            
        })
        res.json(textImage)

    }catch(err){
        next(err)
    }
})



//----------------------------------------------
// POST
//----------------------------------------------

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

// upload 폴더로 바로 복사만 함. 그리고 복사된 파일 이름을 프론트로 전송함
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
    console.log('harry- textImage')
    res.json(req.files.map(v => v.filename));
});


router.post('/createTextImage', isLoggedIn, async(req, res, next)=>{
    try{
        const newTextImage = await db.TextImage.create({        
            logo: req.body.logo,
            title: req.body.title,
            subtitle: req.body.subtitle,
            buttonName: req.body.buttonName,
            description: req.body.description,
            addOn: req.body.addOn,
            textAlign: req.body.textAlign,
            bgArray: req.body.bgArray,
            fontArray: req.body.fontArray,
            buttonArray: req.body.buttonArray,
            sliderFont: req.body.sliderFont,
            sliderPadding: req.body.sliderPadding,
            sliderOpacity: req.body.sliderOpacity,
            sliderLineHeight: req.body.sliderLineHeight,
            UserId: req.user.id
        })    

        if(req.body.backgroundImage){
            await db.Image.create({
                src: req.body.backgroundImage,
                TextImageId: newTextImage.id
            })
        }

        const fullPost = await db.TextImage.findOne({
            where: { id: newTextImage.id },
            include: [
                { model: db.User, attributes: ['id', 'username', 'email']}, 
                { model: db.Image },
            ],
            order: [['createdAt', 'DESC'], ['updatedAt','ASC']]
        })
        return res.json(fullPost)
    }catch(err){
        next(err)
    }
})





module.exports = router