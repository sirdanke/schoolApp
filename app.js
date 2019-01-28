
const express = require('express')
const app = express()
const port = 3000
const Teachers = require('./routes/teachers')
const Subjects = require('./routes/subjects')
const Students = require('./routes/students')

app.use(express.urlencoded({extended : false}))
app.set('view engine', 'ejs')


app.use('/teachers',Teachers)
app.use('/subjects',Subjects)
app.use('/students',Students)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))