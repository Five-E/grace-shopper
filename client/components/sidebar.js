import React from 'react'
import CategoryList from './category-list'

export default function Sidebar() {
  return (
    <nav className="sidebar">
    <div className="sidebar-header">
    <h3 href="#">
      <div>Categories</div>
    </h3>
  </div>
  <CategoryList />
    </nav>
  )
}
