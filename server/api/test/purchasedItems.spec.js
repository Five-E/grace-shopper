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

describe('Purchased Items routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('API: purchasedItems route tests', () => {

    describe('GET /api/purchasedItems/', () => {
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

      it('should return purchased items and associated models from DB', () => {
        return request(app)
          .get('/api/purchasedItems/')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body[0].item.id).to.be.equal(1)
            expect(res.body[0].item.category.id).to.be.equal(2)
            expect(res.body[0].purchasePrice).to.be.equal(0.01)
            expect(res.body[0].purchaseQuantity).to.be.equal(100)
          })
      })
    })
  })

    describe('GET /api/purchasedItems/:orderId', () => {
      beforeEach(() => {
        const OPTIONS = { validate: true, individualHooks: true }
        return User.bulkCreate(testData.Users, OPTIONS)
        .then(() => { return Status.bulkCreate(testData.Statuses, OPTIONS) })
        .then(() => { return Category.bulkCreate(testData.Categories, OPTIONS) })
        .then(() => { return Item.bulkCreate(testData.Items, OPTIONS) })
        .then(() => { return Orders.bulkCreate([
          {
            userId: 2,
            statusId: 2
          },
          {
            userId: 1,
            statusId: 3
          }
        ], OPTIONS) })
        .then(() => { return PurchasedItem.bulkCreate([
          {
            purchasePrice: 0.01,
            purchaseQuantity: 100,
            itemId: 1,
            orderId: 1
          },
          {
            purchasePrice: 0.01,
            purchaseQuantity: 100,
            itemId: 1,
            orderId: 2
          }
        ], OPTIONS) })
        .catch(console.error)
      })

      it('should return purchased items FOR A SPECIFIC ORDER and associated models from DB', () => {
        return request(app)
          .get('/api/purchasedItems/2')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body[0].item.id).to.be.equal(1)
            expect(res.body[0].item.category.id).to.be.equal(2)
            expect(res.body[0].orderId).to.be.equal(2)
          })
      })
    })
  })
