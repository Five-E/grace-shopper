const router = require('express').Router()
const {CartItem} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  CartItem.findAll()
    .then(CartItems => res.json(CartItems))
    .catch(next)
})

router.post('/', (req, res, next) => {
  CartItem.findOrCreate({ where: {userId: req.body.userId, itemId: req.body.itemId} })
    .spread((item, wasCreated) => {
      if (!wasCreated) {
        item.update({quantity: item.quantity + 1})
          .then(updatedItem => res.json(updatedItem))
      } else {
        item.update({quantity: req.body.quantity})
          .then(newItem => res.json(newItem))
      }
    })
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  const userId = req.params
  CartItem.findAll({ where: userId })
    .then(CartItems => res.json(CartItems))
    .catch(next)
})
