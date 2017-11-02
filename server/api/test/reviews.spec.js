/* global describe beforeEach it */
const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const Review = db.model('review')
const User = db.model('user')
const Item = db.model('item')

describe('Item routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/reviews/', () => {

    beforeEach('Seed Users', () => {
      return User.create({
        name: 'DTRJ',
        email: 'Dwayne@WWE.com'
      })
    })

    beforeEach('Seed Items', () => {
      return Item.create({
        name: 'blue rock',
        price: 15,
        stock: 2
      })
    })
    beforeEach('Seed Reviews', () => {
      return Review.create({
        content: 'Great movies',
        userId: 1,
        itemId: 1
      })
    })


    it('GET /api/reviews', () => {
      return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].content).to.be.equal('Great movies')
        })
    })

    it('Eager loads user and item', () => {
      return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].user.name).to.be.equal('DTRJ');
        })
    })
  })





})
