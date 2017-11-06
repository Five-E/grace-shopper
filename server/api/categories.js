const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Category.findAll()
<<<<<<< HEAD
    .then(categories => res.json(categories))
=======
    .then(Cat => res.json(Cat))
>>>>>>> 803d19c2156234bbc92619f699a904eaa59a1e95
    .catch(next)
})
