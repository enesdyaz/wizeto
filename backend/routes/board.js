const express = require('express');
const multer = require('multer');
const path = require('path');

const db = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();


router.get('/fetch', async(req, res, next)=>{   
    try{
        const board = await db.Board.findAll({
            include: [{model: db.User, attributes: ['id', 'username', 'email']}],
            order: [['createdAt', 'DESC'], ['updatedAt','ASC']],            
        })
        res.json(board)

    }catch(err){ next(err)}
})

router.post('/create', async(req, res, next)=>{
    try{
        console.log('backend-create payload', req.body)
        const board = await db.Board.create({
            title: req.body.title,
            bgColor: req.body.bgColor
        })
        res.json(board)
    }catch(err){ next(err)}
})




//-------------------------------------
// image - uploads
//-------------------------------------
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
    res.json(req.files.map(v => v.filename));
});



module.exports = router;