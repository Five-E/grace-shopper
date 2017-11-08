/* global describe beforeEach it */

import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AdminUserItem  from '../admin-user-item'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('Admin User Item', () => {
  let adminUserItem
  let user;

  beforeEach(() => {
    user = {
      id: 1,
      name: 'Jeff Bezos',
      email: 'Bezos@amazon.com',
      street: '123 Street',
      city: 'Seattle',
      state: 'Washington',
      zip: 10006,
      isAdmin: false
    }
    adminUserItem = shallow(<AdminUserItem userInfo={user} />)
  })

  it('renders the name in an h3', () => {
    expect(adminUserItem.find('h3').text()).to.be.equal('Jeff Bezos')
    expect(adminUserItem.find('h3').text()).to.not.be.equal('Jeff Bezos123')
  })
})
