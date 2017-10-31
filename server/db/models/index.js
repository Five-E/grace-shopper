const User = require('./user')
const CartItem = require('./cartItem')
const Category = require('./category')
const Item = require('./item')
const Order = require('./order')
const PurchasedItem = require('./purchasedItem')
const Review = require('./review')
const Status = require('./status')


//Associations
User.hasMany(CartItem)
CartItem.belongsTo(User)
User.hasMany(Order)
Order.belongsTo(User)
Order.hasOne(Status)
User.hasMany(Review)
Review.belongsTo(User)
Item.hasMany(Review)
Review.belongsTo(Item)
Item.belongsTo(Category)
Category.belongsTo(Category, {as: 'Parent'})
Order.hasMany(PurchasedItem)
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
