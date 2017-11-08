const router = require('express').Router()
const {Status} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Status.findAll()
    .then(statuses => res.json(statuses))
    .catch(next)
})
