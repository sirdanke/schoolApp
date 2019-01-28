const express = require('express')
const router = express.Router()
const model = require('../models')
const Teachers = model.Teacher
const Subjects = model.Subject



router.get('/', (req,res)=> {
    Teachers.findAll({ include : [{ model : Subjects} ],order : ['id']})
    .then(allTeachers => {
        // res.send(allTeachers)
        res.render('show_all', {allData : allTeachers, name : 'teachers'})
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/add/', (req,res)=> {
    // let error = JSON.parse(req.query)
    console.log(req.query, "=================");
    
    
    res.render('form_register', {name : `teachers`, error : req.query})
})

router.post('/add', (req,res)=> {
    Teachers.create(req.body)
    .then(data => {
        res.redirect('/teachers')
    })
    .catch(err => {
        // res.send(err)
        res.redirect(`/teachers/add/?err=${err.errors[0].message}`)
    })
})

router.get('/edit/:id', (req,res)=> {
    let data = ''
    Teachers.findByPk(req.params.id,  {include : [{model : Subjects }]})
    .then(teacher => {
        data = teacher
        return Subjects.findAll()
    })
    .then(allSubjects => {
        res.render('form_edit', {data : data, allSubjects : allSubjects, name : 'teachers', error : req.query})
    })
    .catch(err => {
        res.redirect(`/teachers/edit/${req.params.id}/?err=${err}`)
        // res.send(err)
    })
})


router.post('/edit/:id', (req,res)=> {
    // res.send(req.body)
    Teachers.findByPk(req.params.id)
    .then(teacher => {
        return teacher.update(req.body)
    })
    .then(()=> {
        res.redirect('/teachers')
    })
    .catch(err => {
        res.redirect(`/teachers/edit/${req.params.id}/?err=${err.errors[0].message}`)
        // res.send(err)
    })
})

router.get('/delete/:id', (req,res)=> {
    Teachers.destroy({where : { id : req.params.id }})
    .then(()=> {
        res.redirect('/teachers')
    })
    .catch(err => {
        res.send(err)
    })
})


module.exports = router