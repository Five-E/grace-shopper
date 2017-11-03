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
const CartItem = db.model('cartItem')
const Status = db.model('status')
const User = db.model('user')

const testData = require('./testData')

describe('Cart Items routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('API: cartItems route tests', () => {

    describe('GET /api/cartItems/:userId', () => {
      beforeEach(() => {
        const OPTIONS = { validate: true, individualHooks: true }
        return User.bulkCreate(testData.Users, OPTIONS)
        .then(() => { return Status.bulkCreate(testData.Statuses, OPTIONS) })
        .then(() => { return Category.bulkCreate(testData.Categories, OPTIONS) })
        .then(() => { return Item.bulkCreate(testData.Items, OPTIONS) })
        .then(() => { return Orders.bulkCreate(testData.Orders, OPTIONS) })
        .then(() => { return PurchasedItem.bulkCreate(testData.PurchaseItem, OPTIONS) })
        .then(() => { return CartItem.bulkCreate(testData.cartItems, OPTIONS) })
        .catch(console.error)
      })

      it('should return cart items and associated models from DB  FOR A SPECIFIC USER', () => {
        return request(app)
          .get('/api/cartItems/2')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body[0].item.id).to.be.equal(1)
            expect(res.body[0].quantity).to.be.equal(420)
          })
      })
    })
    describe('POST /api/cartItems/', () => {
      beforeEach(() => {
        const OPTIONS = { validate: true, individualHooks: true }
        return User.bulkCreate(testData.Users, OPTIONS)
        .then(() => { return Status.bulkCreate(testData.Statuses, OPTIONS) })
        .then(() => { return Category.bulkCreate(testData.Categories, OPTIONS) })
        .then(() => { return Item.bulkCreate(testData.Items, OPTIONS) })
        .then(() => { return Orders.bulkCreate(testData.Orders, OPTIONS) })
        .then(() => { return PurchasedItem.bulkCreate(testData.PurchaseItem, OPTIONS) })
        .then(() => { return CartItem.bulkCreate(testData.cartItems, OPTIONS) })
        .catch(console.error)
      })

      it('POST cartItem to url should return posted cartItem ', () => {
        return request(app)
          .post('/api/cartItems/')
          .send({
            quantity: 420,
            userId: 1,
            itemId: 1
          })
          .expect(200)
          .then(res => {
            expect(res.body.itemId).to.be.equal(1)
            expect(res.body.userId).to.be.equal(1)
            expect(res.body.quantity).to.be.equal(420)
          })
      })
    })
  })

})
