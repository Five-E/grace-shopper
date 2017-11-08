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

router.delete('/:userId', (req,res,next) => {
  CartItem.destroy({ where: req.params})
    .then(_ => res.send('dropped by the rock'))
})

router.post('/addQuantity', (req, res, next) => {
  CartItem.findOrCreate({ where: {userId: req.body.userId, itemId: req.body.itemId} })
    .spread((item, wasCreated) => {
      console.log(item)
      let currentQuantity = wasCreated ? 0 : item.quantity
      const SUM = currentQuantity + req.body.quantity
      return item.update({quantity: SUM})
    })
    .then(updatedItem => res.json(updatedItem))
    .catch(next)
})

router.post('/', (req, res, next) => {
  CartItem.findOrCreate({ where: {userId: req.body.userId, itemId: req.body.itemId} })
    .spread((item, wasCreated) => {
      if (req.body.quantity) {
        return item.update({quantity: req.body.quantity})
      } else {
        return item.update({quantity: item.quantity + 1})
      }
    })
    .then(updatedItem => res.json(updatedItem))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  const userId = req.params
  CartItem.findAll({ where: userId })
    .then(CartItems => res.json(CartItems))
    .catch(next)
})
