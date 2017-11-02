const User = require('./user')
const CartItem = require('./cartItem')
const Category = require('./category')
const Item = require('./item')
const Order = require('./order')
const PurchasedItem = require('./purchasedItem')
const Review = require('./review')
const Status = require('./status')


// Associations, can you smell what the rock is cooking :)
User.hasMany(CartItem)
User.hasMany(Review)
Item.hasMany(Review)
User.hasMany(Order)
Item.belongsTo(Category)
CartItem.belongsTo(User)
CartItem.belongsTo(Item)
Order.belongsTo(User)
Order.belongsTo(Status)
Order.hasMany(PurchasedItem)
Review.belongsTo(User)
Review.belongsTo(Item)
Category.belongsTo(Category, {as: 'Parent'})
PurchasedItem.belongsTo(Order)
PurchasedItem.belongsTo(Item)


module.exports = {
  User,
  CartItem,
  Category,
  Item,
  Order,
  PurchasedItem,
  Review,
  Status
}
