const express = require('express');
const router = new express.Router();
const Student = require('../db/models/student');

router.post('/addStudent', (req, res, next) => {
  console.log('backend.POST to /addStudent, req.body', req.body);
  Student.create(req.body)
  .then(data => {
    console.log('data:', data)
    return res.json(data)
  })
  .catch(next)
})

router.param('studentId', (req, res, next, id) => {
  //const studentId = +req.params.studentId;
  console.log('id', id, 'typeof id paramter:', typeof id)

  Student.findById(id)
  .then(student => {
    req.student = student
    console.log('found a stud! req.student:', req.student)
    next();
  })
  .catch(err => console.error(err))
});

router.put('/:studentId/edit', (req, res, next) => {
  console.log('.PUT /:studentId/edit req.student.name', req.student.name)

  console.log('the OG:', req.student.name, 'the edit: req.body:', req.body)

  req.student.update(req.body)
  .then(data => {
    console.log('Updated data on server-side:', data)
    return data;
  })
  .then(el => {
    console.log('Server: doubt this is anything:', el)
    res.json(req.student);
  })
})

router.route('/:studentId')
// .all((req, res, next) => {
//   console.log('server.ALL to /:studentId')
//   const studentId = +req.params.studentId;

//   Student.findById(studentId)
//   .then(student => {
//     //res.json(student)
//     req.student = student
//     console.log('found one! req.student:', req.student)
//     next();
//   })
//   .catch(err => console.error(err))
// })
.get( (req, res, next) => {
  console.log('router.GET for /:studentId req.student.name', req.student.name)
  res.json(req.student);
})
.delete( (req, res, next) => {
  //const studentId = +req.params.studentId;
  console.log('router.DELETE for /:studentId req.student.name', req.student.name)
  req.student.destroy()
  .then( data => {
    console.log('destroying data:', data, 'RIP req.student.name:', req.student.name);
    res.json(req.student)
  })
  .catch(next)
})

router.get('/', (req, res, next) => {
  Student.findAll()
  .then(students => res.json(students))
  .catch(next)
})

module.exports = router
