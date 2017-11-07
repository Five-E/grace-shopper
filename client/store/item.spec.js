/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {itemsFetched, itemAdded, itemUpdated, itemDeleted} from './item'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('redux tests', () => {
  let store
  let mockAxios

  const initialItemsState = []

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialItemsState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('action creators', () => {

    beforeEach(() => {})

    it('itemsFetched returns expected action', () => {
      let fakeItems = [1, 2, 3];

      const actionDescriptor = itemsFetched(fakeItems)
      expect(actionDescriptor).to.be.deep.equal({
        type: 'ITEMS_FETCHED',
        items: fakeItems
      })
    })
  })

})
