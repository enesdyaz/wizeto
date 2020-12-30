const express = require('express');
const multer = require('multer');
const path = require('path');

const db = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

//---------------------------


router.post('/addParent', async(req, res, next)=>{
    const newCategory = await db.Category.create({
        parent: req.body.parent,
        child: [],
    })
    res.status(200).json(newCategory)
})

router.post('/addChild', async(req, res, next)=>{
    console.log('harry-req-child', req.body)
    const newChild = await db.Child.create({
        CategoryId: req.body.parentId,
        name: req.body.name,
        price: req.body.price,
        duration: req.body.duration,
        description: req.body.description,
        imagePath: req.body.image,
    })
    res.status(200).json(newChild)
})







module.exports = router;