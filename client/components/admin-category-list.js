import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AdminCategory from './admin-category'


const AdminCategoryList = (props) => {

  const categories = props.categories;
  if (!categories) return null;
  return (
    <div>
      <h3>Admin Category List</h3>
      <button className="btn btn-secondary"><NavLink to={`/admin-category-add`}>Add new category</NavLink></button>
      <div className="row">
      {
        categories.map(category => {
          return (
            <div key={category.id}>
              <AdminCategory cateInfo={category} />
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

const mapState = (state) => {
  return {
    categories: state.categories
   }
}

const mapDispatch = null;

export default connect(mapState, mapDispatch)(AdminCategoryList)
