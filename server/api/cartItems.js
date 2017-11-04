const router = require('express').Router()
const {CartItem} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  CartItem.findAll()
    .then(CartItems => res.json(CartItems))
    .catch(next)
})

router.post('/', (req, res, next) => {
  CartItem.create(req.body)
    .then(CartItem => res.json(CartItem))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  const userId = req.params
  CartItem.findAll({ where: userId })
    .then(CartItems => res.json(CartItems))
    .catch(next)
})