const Users = [
  {
    name: 'A Rock',
    email: 'justARock@DwaynesWorld.com',
    password: 'disappointment',
    street: '1 Timeless Ave',
    city: 'Los Angeles',
    state: 'California',
    zip: '54321'
  },
  {
		name: 'The Rock',
		email: 'theRock@DwaynesWorld.com',
		password: 'Furious',
		street: '1 Young Ave',
		city: 'Los Angeles',
		state: 'California',
		zip: '12345'
	}
]

const Statuses = [
  {
    // # 1
    name: 'ordered'
  },
  {
    // # 2
    name: 'shipped'
  },
  {
    // # 3
    name: 'in transit'
  },
  {
    // # 4
    name: 'in ring'
  },
  {
    // # 5
    name: 'dwayning'
  },
  {
    // # 6
    name: 'In a Kevin Hart movie'
  }
]

const Orders = [{
  userId: 2,
  statusName: 'dwayning'
}]

const PurchaseItem = [{
  purchasePrice: 0.01,
  purchaseQuantity: 100,
  itemId: 1,
  orderId: 1
}]

const Items = [{
  name: 'Dwayne Johnson',
  picture: 'http://az616578.vo.msecnd.net/files/2016/04/03/6359525694436325221322078085_dwaynejohnson.jpg',
  price: 1000000,
  stock: 9,
  // categories: [1, 2]
}]

const Categories = [{
  name: 'Wrestler',
  image: 'https://qph.ec.quoracdn.net/main-qimg-c24d1fe669b03a09c7bc7537f08e283a-c'
},{
  name: 'Motion Picture Actor',
  image: 'https://qph.ec.quoracdn.net/main-qimg-c24d1fe669b03a09c7bc7537f08e283a-c'
}]

const cartItems = [{
  quantity: 420,
  userId: 2,
  itemId: 1
}]

module.exports = { Users, Statuses, Orders, PurchaseItem, Items, Categories, cartItems }