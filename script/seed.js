
const Promise = require("bluebird");
const {
  User,
  CartItem,
  Category,
  Item,
  Order,
  PurchasedItem,
  Review,
  Status
} = require('../server/db/models');

const db = require('../server/db');


const userData = [
  {
    name: 'Eren',
    email: 'ererdogan20@gmail.com',
    password: 'mysecrectpassword',
    street: '14 Adams Court',
    city: 'New York City',
    state: 'New York',
    zip: '10001',
    isAdmin: true
  },
  {
    name: 'Eric',
    email: 'eric20@gmail.com',
    password: 'ericspassword',
    street: '11 Hanover Court',
    city: 'Jersey City',
    state: 'New Jersey',
    zip: '07324'
  },
  {
    name: 'Evans',
    email: 'evans@gmail.com',
    password: 'mysecrectpassword',
    street: '134 Wall Street',
    city: 'New York City',
    state: 'New York',
    zip: '10001',
    isAdmin: true
  },
  {
    name: 'Ethan',
    email: 'ethan@gmail.com',
    password: 'ethanpassword',
    street: '163 6th Avenue',
    city: 'Princeton',
    state: 'New Jersey',
    zip: '08342'
  },
  {
    name: 'Eyvette',
    email: 'evy@gmail.com',
    password: 'supersecretpassword',
    street: '123 Fake Street',
    city: 'Queens',
    state: 'New York',
    zip: '10341'
  }
];

const itemData = [
  {
    name: 'Dwayne Johnson',
    picture: 'http://az616578.vo.msecnd.net/files/2016/04/03/6359525694436325221322078085_dwaynejohnson.jpg',
    price: 15000.99,
    stock: 1,
    categoryId: 2
  },
  {
    name: 'Bath Salt',
    picture: 'http://az616578.vo.msecnd.net/files/2016/04/03/6359525694436325221322078085_dwaynejohnson.jpg',
    price: 25.34,
    stock: 16,
    categoryId: 1
  },
  {
    name: 'Kimberlite',
    picture: 'http://az616578.vo.msecnd.net/files/2016/04/03/6359525694436325221322078085_dwaynejohnson.jpg',
    price: 12.23,
    stock: 50,
    categoryId: 2
  },
  {
    name: 'Picrite',
    picture: 'http://az616578.vo.msecnd.net/files/2016/04/03/6359525694436325221322078085_dwaynejohnson.jpg',
    price: 5.35,
    stock: 70,
    categoryId: 1
  },
  {
    name: 'Icelandite',
    picture: 'http://az616578.vo.msecnd.net/files/2016/04/03/6359525694436325221322078085_dwaynejohnson.jpg',
    price: 1225.77,
    stock: 5,
    categoryId: 3
  },
  {
    name: 'Charnockite',
    picture: 'http://az616578.vo.msecnd.net/files/2016/04/03/6359525694436325221322078085_dwaynejohnson.jpg',
    price: 37854.33,
    stock: 99,
    categoryId: 2
  },
  {
    name: 'Geodude',
    picture: 'http://az616578.vo.msecnd.net/files/2016/04/03/6359525694436325221322078085_dwaynejohnson.jpg',
    price: 70.50,
    stock: 50,
    categoryId: 3
  },
  {
    name: 'Gabbro',
    picture: 'http://az616578.vo.msecnd.net/files/2016/04/03/6359525694436325221322078085_dwaynejohnson.jpg',
    price: 33.10,
    stock: 60,
    categoryId: 1
  }
];

const categoryData = [
  {
    name: 'Igneous',
    image: 'https://qph.ec.quoracdn.net/main-qimg-c24d1fe669b03a09c7bc7537f08e283a-c'
  },
  {
    name: 'Metamorphic',
    image: 'https://qph.ec.quoracdn.net/main-qimg-c24d1fe669b03a09c7bc7537f08e283a-c'
  },
  {
    name: 'Sedimentary',
    image: 'https://qph.ec.quoracdn.net/main-qimg-c24d1fe669b03a09c7bc7537f08e283a-c'
  }
];

const purchasedItemData = [
  {
    purchasePrice: 55.10,
    itemId: 2,
    orderId: 1
  },
  {
    purchasePrice: 15.00,
    itemId: 3,
    orderId: 2
  },
  {
    purchasePrice: 5.60,
    itemId: 4,
    orderId: 2
  },
  {
    purchasePrice: 10.33,
    itemId: 2,
    orderId: 2
  }
]

const cartItemData = [
  {
    quantity: 12,
    itemId: 3,
    userId: 2
  },
  {
    quantity: 5,
    itemId: 3,
    userId: 1
  },
  {
    quantity: 1,
    itemId: 4,
    userId: 3
  },
  {
    quantity: 17,
    itemId: 1,
    userId: 3
  }
];

const statusData = [
  {
    name: 'ordered'
  },
  {
    name: 'shipped'
  },
  {
    name: 'in transit'
  },
  {
    name: 'in ring'
  },
  {
    name: 'dwayning'
  },
  {
    name: 'In a Kevin Hart movie'
  }
]

const orderData = [
  {
    statusId: 5,
    userId: 3
  },
  {
    statusId: 6,
    userId: 4
  }
];

const reviewData = [
  {
    rating: 5,
    content: 'Can you smell what the rock is cooking??',
    userId: 3,
    itemId: 1
  },
  {
    rating: 3,
    content: 'It was aight fam',
    userId: 1,
    itemId: 4
  },
  {
    rating: 1,
    content: 'This is THE ROCK, not A rock',
    userId: 2,
    itemId: 1
  },
]

// User Seeding
const promiseArrUsers = () => {
  return userData.map(user => {
    return User.build(user)
  })
};

const createUsers = () => {
  return Promise.map(promiseArrUsers(),
  function (user) {
    return user.save();
  })
}

// Item Seeding
const promiseArrItems = () => {
  return itemData.map(item => {
    return Item.build(item)
  })
};

const createItems = () => {
  return Promise.map(promiseArrItems(),
  function (item) {
    return item.save();
  })
}

// Catergory Seeding
const promiseArrCategorys = () => {
  return categoryData.map(category => {
    return Category.build(category)
  })
};

const createCategorys = () => {
  return Promise.map(promiseArrCategorys(),
  function (category) {
    return category.save();
  })
}

// PurchasedItem Seeding
const promiseArrPurchasedItems = () => {
  return purchasedItemData.map(purchasedItem => {
    return PurchasedItem.build(purchasedItem)
  })
};

const createPurchasedItems = () => {
  return Promise.map(promiseArrPurchasedItems(),
  function (purchasedItem) {
    return purchasedItem.save();
  })
}

// CartItem Seeding
const promiseArrCartItems = () => {
  return cartItemData.map(cartItem => {
    return CartItem.build(cartItem)
  })
};

const createCartItems = () => {
  return Promise.map(promiseArrCartItems(),
  function (cartItem) {
    return cartItem.save();
  })
}

// Status Data Seeding
const promiseArrStatus = () => {
  return statusData.map(status => {
    return Status.build(status)
  })
};

const createStatus = () => {
  return Promise.map(promiseArrStatus(),
  function (status) {
    return status.save();
  })
}

// Order Data Seeding
const promiseArrOrders = () => {
  return orderData.map(order => {
    return Order.build(order)
  })
};

const createOrders = () => {
  return Promise.map(promiseArrOrders(),
  function (order) {
    return order.save();
  })
}

// Review Data Seeding
const promiseArrReviews = () => {
  return reviewData.map(review => {
    return Review.build(review)
  })
};

const createReviews = () => {
  return Promise.map(promiseArrReviews(),
  function (review) {
    return review.save();
  })
}

const seed = () => {
  return createUsers()
  .then(() => createCategorys())
    .then(() => createItems())
    .then(() => createStatus())
    .then(() => createOrders())
    .then(() => createPurchasedItems())
    .then(() => createCartItems())
    .then(() => createReviews())
}

db.sync({force: true})
  .then(() => {
    console.log('\nThe Rock dropped the old data with the peoples elbow!!!');
    return seed();
  })
  .then(() => {
    console.log('\nSuccessfully inserted new data!');
  })
  .catch(function (err) {
    console.error('\nDamn bro, there was a problem', err, err.stack);
  })
  .finally(function () {
    db.close();
    console.log('\nConnection closed, we out');
    return null;
  });
