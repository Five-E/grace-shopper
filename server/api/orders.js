const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({ include: [{ all: true, nested: true }]})
    .then(Orders => res.json(Orders))
    .catch(next)
})
