const router = require('express').Router()
const {Order} = require('../db/models')
const { mustBeAdmin } = require('./auth-util')

module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(Orders => res.json(Orders))
    .catch(next)
})

router.put('/:orderId', mustBeAdmin, (req, res, next) => {
  const orderId = +req.params.orderId;
  Order.update(req.body, { where: { id: orderId }, returning: true })
    .then((response) => res.json(response[1][0]))
    .catch(next)
})
