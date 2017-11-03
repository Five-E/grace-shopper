const router = require('express').Router()
const {Item} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Item.findAll()
    .then(items => res.json(items))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Item.create(req.body)
    .then((item) => {
      res.json(item)
    })
    .catch(next)
})
