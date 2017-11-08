const router = require('express').Router()
const {User} = require('../db/models')
const { mustBeAdmin } = require('./auth-util')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'name', 'street', 'city', 'state', 'zip', 'isAdmin']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.put('/:userId', mustBeAdmin, (req, res, next) => {
  const userId = req.params.userId;
  User.update(req.body, {where: {id: userId}, returning: true})
    .then((item) => res.json(item))
    .catch(next)
})

router.delete('/:userId', mustBeAdmin, (req, res, next) => {
  User.destroy({where: {id: req.params.userId}, returning: true})
  .then((result) => {
    res.json(result)
  })
  .catch(next)
})
