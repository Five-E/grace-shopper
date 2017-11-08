/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../../index')
const Item = db.model('item')
const Category = db.model('category')

describe('Item model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('required model data', () => {
    let theRock

    beforeEach(() => {
      return Category.create({
        name: 'igneous'
      })
    })

    beforeEach(() => {
      return Item.create({
        name: 'Dwayne TRJ',
        price: 109.99,
        stock: 1,
        description: 'rock-n-sock',
      })
      .then(item => {
        theRock = item
      })
    })

    it('checks if the Item name, price, stock, and description are correct', () => {
      expect(theRock.name).to.be.equal('Dwayne TRJ')
      expect(theRock.price).to.be.equal(109.99)
      expect(theRock.stock).to.be.equal(1)
      expect(theRock.description).to.be.equal('rock-n-sock')
    })

    
  })
})
