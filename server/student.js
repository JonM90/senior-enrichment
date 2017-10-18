const express = require('express');
const router = new express.Router();
const Student = require('../db/models/student');

router.post('/addStudent', (req, res, next) => {
  console.log('In the addStudent backend post!...req.body:', req.body);
  Student.create(req.body)
  .then(data => {
    console.log('data:', data)
  })
  .catch(next)
})

router.get('/:studentId', (req, res, next) => {
  const studentId = Number(req.params.studentId)
  console.log(typeof studentId)

  Student.findById(studentId)
  .then(student => res.json(student))
  .catch(next)
})

router.get('/', (req, res, next) => {
  Student.findAll()
  .then(students => res.json(students))
  .catch(next)
})

module.exports = router
