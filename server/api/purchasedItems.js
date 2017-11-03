const router = require('express').Router()
const {PurchasedItem} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  PurchasedItem.findAll()
    .then(PurchasedItems => res.json(PurchasedItems))
    .catch(next)
})

router.get('/:orderId', (req, res, next) => {
  const orderId = req.params
  PurchasedItem.findAll({ where: orderId })
    .then(PurchasedItems => res.json(PurchasedItems))
    .catch(next)
})
