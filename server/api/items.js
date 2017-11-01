const router = require('express').Router()
const {Item} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Item.findAll()
    .then(Items => res.json(Items))
    .catch(next)
})
