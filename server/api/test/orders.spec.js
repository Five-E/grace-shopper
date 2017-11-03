/* global describe beforeEach it */
const Promise = require('bluebird')
const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')

const Orders = db.model('order')
const Category = db.model('category')
const Item = db.model('item')
const PurchasedItem = db.model('purchasedItem')
const Status = db.model('status')
const User = db.model('user')

const testData = require('./testData')

describe('Orders routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('API: orders route tests', () => {

    describe('GET /api/orders/', () => {
      // beforeEach(() => {
        // return Promise.each([
        //   User.bulkCreate(testData.Users, OPTIONS),
        //   Status.bulkCreate(testData.Statuses, OPTIONS),
        //   Category.bulkCreate(testData.Categories, OPTIONS),
        //   Item.bulkCreate(testData.Items, OPTIONS),
        //   Orders.bulkCreate(testData.Orders, OPTIONS),
        //   PurchasedItem.bulkCreate(testData.PurchaseItem, OPTIONS)
        // ])
        // .catch(console.error)
      // })
      beforeEach(() => {
        const OPTIONS = { validate: true, individualHooks: true }
        return User.bulkCreate(testData.Users, OPTIONS)
        .then(() => { return Status.bulkCreate(testData.Statuses, OPTIONS) })
        .then(() => { return Category.bulkCreate(testData.Categories, OPTIONS) })
        .then(() => { return Item.bulkCreate(testData.Items, OPTIONS) })
        .then(() => { return Orders.bulkCreate(testData.Orders, OPTIONS) })
        .then(() => { return PurchasedItem.bulkCreate(testData.PurchaseItem, OPTIONS) })
        .catch(console.error)
      })

      it('should return orders and associated models from DB', () => {
        return request(app)
          .get('/api/orders/')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body[0].status.id).to.be.equal(1)
            expect(res.body[0].user.id).to.be.equal(2)
            expect(res.body[0].purchasedItems).to.be.an('array')
            expect(res.body[0].purchasedItems[0].item.id).to.be.equal(1)
          })
      })
    })
  })

})
