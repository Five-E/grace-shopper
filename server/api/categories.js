const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(Cat => res.json(Cat))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Category.create(req.body)
  .then(category => {
    res.json(category)
  })
  .catch(next)
})

router.put('/:categoryId', (req, res, next) => {
  const categoryId = req.params.categoryId;
  Category.update(req.body, {where: {id: categoryId}, returning: true})
    .then((category) => res.json(category))
    .catch(next)
})

router.delete('/:categoryId', (req, res, next) => {
  Category.destroy({where: {id: req.params.categoryId}, returning: true})
  .then((result) => {
    res.json(result)
  })
  .catch(next)
})
