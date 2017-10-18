const express = require('express');
const router = new express.Router();
const Campus = require('../db/models/campus');
const Student = require('../db/models/student');

router.post('/addCampus', (req, res, next) => {
  console.log('In the addCampus backend post! req.body:', req.body);
  Campus.create(req.body)
  .then(data => {
    console.log('data:', data)
    return res.json(data)
  })
  .catch(next)
})

router.get('/:campusId', (req, res, next) => {
  const campusId = +req.params.campusId;

  Campus.findOne({
    where: { id: campusId },
    include: { model: Student }
  })
  .then(campus => res.json(campus))
  .catch(next)
})

router.get('/', (req, res, next) => {
  Campus.findAll()
  .then(campuses => res.json(campuses))
  .catch(next)
})

module.exports = router
