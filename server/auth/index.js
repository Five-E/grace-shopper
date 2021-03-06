const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

const mustHavePassword = (req, res, next) => {
  if (!req.body.password) {
    next(Error('Unauthorized'))
  } else {
    next()
  }
}

router.post('/login', mustHavePassword, (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})

router.post('/signup', mustHavePassword, (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/guest', mustHavePassword, (req, res, next) => {
  const lookupUser = {
    email: req.body.email
  }
  User.findOrCreate({ where: lookupUser})
    .spread((user, wasCreated) => {
      return user.update(req.body)
    })
    .then(updatedUser => res.json(updatedUser))
    .catch(next)
})

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
