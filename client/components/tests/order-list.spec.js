/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import OrderList from './order-list'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Orders List Component', () => {
  let orderList

  describe('No orders', () => {
    beforeEach(() => {
      orderList = shallow(<OrderList orders={[]} />)
    })
    it('Should show no orders if empty array is passed in', () => {
      expect(orderList.find('div>div').length).to.be.equal(0)
    })
  })

  describe('Orders', () => {
    beforeEach(() => {
      orderList = shallow(<OrderList orders={[{
        id: 1,
        user: {name: 'Dwayne'},
        createdAt: 'test',
        totalPrice: '$1',
        itemQuantity: 1
      }]} />)
    })

    it('Should show orders if array of order objects is passed in', () => {
      const lookInside = orderList.find('div>div')
      expect(lookInside.length).to.be.equal(1)
      expect(lookInside.text()).to.include('Dwayne')
      expect(lookInside.text()).to.include('$1')
    })
  })
})
