const express = require('express');
const db = require('../models');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('./middlewares')
const multer = require('multer')
const path = require('path')  // node 기본 제공 메소드, 파일 관련

router.post('/')

//------------------------------------------------//
// MULTIPLE IMAGE UPLOAD
//------------------------------------------------//
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, 'upload')  // upload 폴더에 저장
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname)   // 확장자 추출   ext = .png
            const basename = path.basename(file.originalname, ext)   // 이름  baename = harryPicture
            done(null, basename + Date.now() + ext)
        }
    }),
    limit: {
        fileSize: 20 * 1024 * 1024  // 20MB
    }
})


//------------------------------------------------//
// ROUTE
//------------------------------------------------//
// single(name),  array(name, maxAccount)
router.post('/mainFormImage', isLoggedIn, upload.array('image'), async(req, res, next)=>{  // formData의 key = 'image'
    res.json(req.files.map(v=>v.filename))
})





module.exports = router