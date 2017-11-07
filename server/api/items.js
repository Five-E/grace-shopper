const router = require('express').Router()
const {Item} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Item.findAll()
    .then(items => res.json(items))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Item.create(req.body)
    .then((item) => {
      res.json(item)
    })
    .catch(next)
})

router.put('/:itemId', (req, res, next) => {
  const itemId = req.params.itemId;

  const itemCategories = req.body.categories || []
  delete req.body.categories

  Item.update(req.body, {where: {id: itemId}, returning: true})
    .then((updatedItem) => {
      if (itemCategories.length) updatedItem.setCategories(itemCategories)
      return res.json(updatedItem)
    })
    .catch(next)
})

router.delete('/:itemId', (req, res, next) => {
  Item.destroy({where: {id: req.params.itemId}, returning: true})
  .then((result) => {
    res.json(result)
  })
  .catch(next)
})
