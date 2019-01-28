const express = require('express')
const router = express.Router()
const model = require('../models')
const Teachers = model.Teacher
const Subjects = model.Subject
const Students = model.Student
const StudentSubjects = model.StudentSubject


router.get('/',(req,res)=> {
    Students.findAll({
        order : ['id']
    })
    .then(allData => {
        res.render('show_all', {allData : allData, name : 'students'})
    })
    .catch(err => {    
        res.send(err)
    })
})
router.get('/add', (req,res)=> {
    res.render('form_register', {name : 'students', error : req.query})
})

router.post('/add', (req,res)=> {
    Students.create(req.body)
    .then(data => {
        res.redirect('/students')
    })
    .catch(err => {
        res.redirect(`/students/add/?err=${err.errors[0].message}`)
    })
})

router.get('/edit/:id', (req,res)=> {
    Students.findByPk(req.params.id)
    .then(data => {
        res.render('form_edit', {data : data, name : 'students',error : req.query })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/edit/:id', (req,res)=> {
    Students.findByPk(req.params.id)
    .then(student => {
        return student.update(req.body)
    })
    .then(()=> {
        res.redirect('/students')
    })
    .catch(err => {
        res.redirect(`/students/edit/${req.params.id}/?err=${err.errors[0].message}`)
        // res.send(err)
    })
})

router.get('/delete/:id', (req,res)=> {
    Students.destroy({where : { id : req.params.id }})
    .then(()=> {
        res.redirect('/students')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/:id/add-subject', (req,res)=> {
    let student = ''
    Students.findByPk(req.params.id)
    .then(data => {
        student = data
        return Subjects.findAll()      
    })
    .then(subjects => {
        res.render('add_subject_to_students', {student, subjects})      
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/:id/add-subject', (req,res)=> {
    let obj = {
        SubjectId : Number(req.body.SubjectId),
        StudentId : Number(req.params.id)
    }
    StudentSubjects.create(obj)
    .then(data => {
        res.redirect('/students')
    })
    .catch(err => {
        res.send(err)
    })

})

module.exports = router