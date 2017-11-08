const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Review.findAll()
    .then(Reviews => res.json(Reviews))
    .catch(next)
})

router.post('/', (req, res, next) => {
  console.log("================= WE ARE HITTING POST ROUTE FOR REVIEW ==========")
  console.log(req.body)
  Review.create(req.body)
    .then(rating => res.json(rating))
    .catch(next)
})
