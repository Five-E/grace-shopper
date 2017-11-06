import React from 'react'

const PurchasedItemsComponent = props => {
  const purchasedItems = props.purchasedItems;
  if (!purchasedItems) return <div> Loading...</div>
  return (
    <div>
    <h4>Ordered Items</h4>
      {purchasedItems.map(purchasedItem => (
        <div key={purchasedItem.id}>
          <b>{purchasedItem.item.name}</b>
          <img height="40px" src={purchasedItem.item.picture} />
          <ul>
            <li>Category: {purchasedItem.item.category.name}</li>
            <li>Purchase Price: {purchasedItem.purchasePrice}</li>
            <li>Purchase Quantity: {purchasedItem.purchaseQuantity}</li>
          </ul>
        </div>
      ))}
    </div>
  )
}

export default PurchasedItemsComponent
