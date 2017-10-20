const express = require('express');
const router = new express.Router();
const Campus = require('../db/models/campus');
const Student = require('../db/models/student');

router.post('/addCampus', (req, res, next) => {
  console.log('backend.POST to /addCampus, req.body', req.body);
  Campus.create(req.body)
  .then(data => {
    console.log('data:', data)
    return res.json(data)
  })
  .catch(next)
})

router.param('campusId', (req, res, next, id) => {
  Campus.findOne({
      where: { id },
      include: { model: Student }
    })
    .then(campus => {
      req.campus = campus
      console.log('found a camp! req.campus:', req.campus)
      next();
    })
    .catch(err => console.error(err))
});

router.put('/:campusId/edit', (req, res, next) => {
  console.log('.PUT /:campusId/edit req.campus.name', req.campus.name)

  console.log('the OG:', req.campus.name, 'the edit req.body:', req.body)

  req.campus.update(req.body)
  .then(data => {
    console.log('Updated data on server-side:', data)
    return data;
  })
  .then(el => {
    console.log('doubt this is anything:', el)
    res.json(req.campus);
  })
  //res.json(req.campus);
})

router.route('/:campusId')
.get( (req, res, next) => {
  console.log('.GET /:campusId req.campus.name', req.campus.name)
  res.json(req.campus);
})
.delete( (req, res, next) => {
  console.log('router.DELETE for /:campusId req.campus.name', req.campus.name)
  req.campus.destroy()
  .then( data => {
    console.log('destroying data:', data, 'RIP req.campus.name:', req.campus.name);
    res.json(req.campus)
  })
  .catch(next)
})

router.get('/', (req, res, next) => {
  Campus.findAll()
  .then(campuses => res.json(campuses))
  .catch(next)
})

module.exports = router
