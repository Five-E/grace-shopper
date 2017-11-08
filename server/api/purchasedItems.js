const router = require('express').Router()
const { PurchasedItem } = require('../db/models')
const { Item } = require('../db/models')
const Promise = require('bluebird')
module.exports = router

router.get('/', (req, res, next) => {
  PurchasedItem.findAll()
    .then(PurchasedItems => res.json(PurchasedItems))
    .catch(next)
})

router.post('/:orderId', (req, res, next) => {
  const cart = req.body
  const itemIds = Object.keys(req.body)
  console.log("itemIds -->", itemIds)
  let itemPrice
  Promise.map(itemIds, (itemId) => {
    return Item.findById(itemId)
      .then(itemInfo => {
        itemPrice = itemInfo.price
        return itemInfo.update({ stock: (itemInfo.stock - cart[itemId])})
      })
      .then(tester => {
        console.log("updated item:",tester)
        return PurchasedItem.create({
          orderId: req.params.orderId,
          itemId: itemId,
          purchasePrice: itemPrice,
          purchaseQuantity: cart[itemId]
        })
      })

  }).then(results => {
    console.log("\n\n\nresults\n\n\n",results)
    res.json(results)
  }).catch(next)
})

router.get('/:orderId', (req, res, next) => {
  const orderId = req.params
  PurchasedItem.findAll({ where: orderId })
    .then(PurchasedItems => res.json(PurchasedItems))
    .catch(next)
})
