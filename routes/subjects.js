
const express = require('express')
const router = express.Router()
const model = require('../models')
const Teachers = model.Teacher
const Subjects = model.Subject
const Students = model.Student
const StudentSubjects = model.StudentSubject



router.get('/', (req,res)=> {
    Subjects.findAll()
    .then(allSubject => {

        let newSubjects = allSubject.map( subject => {
            return new Promise ((resolve,reject)=> {
                subject.getTeachers()
                .then(data => {
                    subject.Teachers = data
                    resolve(subject)
                })
                .catch(err => {
                    reject(err)
                })
            })
        })

        return Promise.all(newSubjects)
    })
    .then(allNewSubjects => {
        res.render( 'show_all', {allData : allNewSubjects, name : 'subjects'})

    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/add', (req,res)=> {
    res.render('form_register', {name : 'subjects'})
})

router.post('/add', (req,res)=> {
    Subjects.create(req.body)
    .then(data => {
        res.redirect('/subjects')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/edit/:id', (req,res)=> {
    Subjects.findByPk(req.params.id)
    .then(data => {
        // res.send(data)
        res.render('form_edit', {data : data, name : 'subjects'})
    })
    .catch(err => {
        res.send(err)
    })
})


router.post('/edit/:id', (req,res)=> {
    Subjects.findByPk(req.params.id)
    .then(subject => {
        return subject.update(req.body)
    })
    .then(()=> {
        res.redirect('/subjects')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/delete/:id', (req,res)=> {
    Subjects.destroy({where : { id : req.params.id }})
    .then(()=> {
        res.redirect('/subjects')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/:id/enrolled-students',(req,res)=> {
    let subject = ''
    Subjects.findOne({ where : {id : req.params.id }, include : [{model : Students}]})
    .then(allSubject => {
        // res.send(allSubject)
        subject = allSubject
        return subject.getStudentSubjects()
    })
    .then(data => {

        data.forEach(d => {
            subject.Students.forEach(student => {
                if(d.StudentId == student.id) {
                    student.ScoreId = d.id
                    student.Score = d.Score
                }
            })        
        })
        res.render( 'show_student_subject', {subject})
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/:id/give-score', (req,res)=> {
    res.render('addscore', {data : req.params.id})
})

router.post('/:id/give-score', (req,res)=> {
    StudentSubjects.update( {Score: Number(req.body.score)}, { where : {id : Number(req.params.id)}})
    .then(data => {
        // res.send(data)
        res.redirect('/subjects')
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router