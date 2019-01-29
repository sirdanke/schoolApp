const express = require('express')
const router = express.Router()
const model = require('../models')
const Users = model.User




router.get('/',(req,res)=> {
    res.render('user/index' ,{err : req.query.err})
})
router.post('/', (req,res)=> {
    Users.create(req.body)
    .then(data => {
        res.redirect('/users')
    })
    .catch(err => {
        res.redirect(`/users/?err=${err}`)
    })
})


module.exports = router