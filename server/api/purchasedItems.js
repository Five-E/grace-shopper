const router = require('express').Router()
const {PurchasedItem} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  PurchasedItem.findAll()
    .then(PurchasedItems => res.json(PurchasedItems))
    .catch(next)
})
