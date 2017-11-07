const router = require('express').Router()
const {CartItem} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  CartItem.findAll()
    .then(CartItems => res.json(CartItems))
    .catch(next)
})

router.delete('/:userId/:itemId', (req,res,next) => {
  CartItem.destroy({ where: {
    userId: req.params.userId,
    itemId: req.params.itemId}
  })
    .then(_ => res.send('dropped by the rock'))
})

router.post('/', (req, res, next) => {
  CartItem.findOrCreate({ where: {userId: req.body.userId, itemId: req.body.itemId} })
    .spread((item, wasCreated) => {
      if (req.body.quantity === 0 ) {
        item.destroy()
          .then(res.send('removed from cart'))
      }
      if (!wasCreated) {
        if (req.body.quantity !== 1) {
          item.update({quantity: req.body.quantity})
          .then(updatedItem => res.json(updatedItem))
        } else {
          item.update({quantity: item.quantity + 1})
          .then(updatedItem => res.json(updatedItem))
        }
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
