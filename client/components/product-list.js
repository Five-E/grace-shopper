import React from 'react'
import { connect } from 'react-redux'
import { ProductItem } from './product-item'
import Sidebar from './sidebar'
import FilterInput from './filter-input'


class ProductList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      categoryId: props.categoryId,
      localitems: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const inputValue = event.target.value;
    this.setState({inputValue});
  }


  render() {
    const inputValue = this.state.inputValue
    const inputRegEx = new RegExp(this.state.inputValue, 'i');
    let items = this.props.items;
    if (this.props.categoryId) {
      items = items.filter(item => !!item.categories.find(category => category.id === this.props.categoryId))
    }
    items = items.filter(item => item.name.match(inputRegEx))
    return (
      <div className="wrapper">
        <Sidebar />
        <div className="content">
        <h3>Product List Page</h3>
        <FilterInput
        handleChange={this.handleChange}
        inputValue={inputValue}
      />
        <div className="row">
          {
           items && items.map(item => {
              return (
                <div key={item.id}>
                  <ProductItem itemInfo={item} />
                </div>
              )
            })
          }
        </div>
      </div>
      </div>
    )
  }
}


const mapState = (state) => {
  return {
    items: state.items,
    categoryId: state.selectedCategory
  }
}

export default connect(mapState)(ProductList)
