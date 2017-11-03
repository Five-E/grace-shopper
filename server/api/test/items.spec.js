/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const Item = db.model('item')

describe('Item routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('API: items route tests', () => {

    beforeEach(() => {
      return Item.create({
        name: 'Dwayne TRJ',
        price: 39999.99,
        stock: 1
      })
    })

    it('GET /api/items', () => {
      return request(app)
        .get('/api/items/')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal('Dwayne TRJ')
          expect(res.body[0].price).to.be.equal(39999.99)
          expect(res.body[0].stock).to.be.equal(1)
        })
    })
  })





})
