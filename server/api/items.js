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
  Item.update(req.body, {where: {id: itemId}, returning: true})
    .then((item) => res.json(item))
    .catch(next)
})

router.delete('/:itemId', (req, res, next) => {
  Item.destroy({where: {id: req.params.itemId}, returning: true})
  .then((result) => {
    res.json(result)
  })
  .catch(next)
})
