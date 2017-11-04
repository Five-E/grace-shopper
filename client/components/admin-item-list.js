import React from 'react'
import { connect } from 'react-redux'
import AdminItem from './admin-item'


const AdminItemList = (props) => {

  const items = props.items;
  if (!items) return null;
  return (
    <div>
      <h3>Admin Product List Page</h3>
      <div className="row">
        {
          items.map(item => {
            return (
              <div key={item.id}>
                <AdminItem itemInfo={item} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

const mapState = (state) => {
  return { items: state.items }
}

const mapDispatch = null;

export default connect(mapState, mapDispatch)(AdminItemList)
