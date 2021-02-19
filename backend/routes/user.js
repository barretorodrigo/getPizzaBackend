const express = require('express');
const router = express.Router();
const { User } = require('../models');
const sha256 = require('js-sha256');
const checkJWT = require('../middlewares/auth');

router.get('/', checkJWT, async(req, res)=>{
    const users = await User.findAll();
    res.status(200).json(users);
});

router.post('/', async(req, res)=>{
    const user = await User.create({
        userName: req.body.userName,
        password: sha256("1%ti"+req.body.password+"@#!ti-senac.$ARA"),
        email: req.body.email
    });
    res.status(201).json(user);
});

router.delete('/:id', async(req, res)=>{
    const user = await User.destroy({
        where:{
            id: req.params.id
        }
    });
    res.status(200).json(user);
});

module.exports = router