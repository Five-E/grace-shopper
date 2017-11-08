
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
  },
  {
    name: 'Bath Salt',
    picture: 'http://az616578.vo.msecnd.net/files/2016/04/03/6359525694436325221322078085_dwaynejohnson.jpg',
    price: 25.34,
    stock: 16,
  },
  {
    name: 'Kimberlite',
    picture: 'http://az616578.vo.msecnd.net/files/2016/04/03/6359525694436325221322078085_dwaynejohnson.jpg',
    price: 12.23,
    stock: 50,
  },
  {
    name: 'Picrite',
    picture: 'http://az616578.vo.msecnd.net/files/2016/04/03/6359525694436325221322078085_dwaynejohnson.jpg',
    price: 5.35,
    stock: 70,
  },
  {
    name: 'Icelandite',
    picture: 'http://az616578.vo.msecnd.net/files/2016/04/03/6359525694436325221322078085_dwaynejohnson.jpg',
    price: 1225.77,
    stock: 5,
  },
  {
    name: 'Charnockite',
    picture: 'http://az616578.vo.msecnd.net/files/2016/04/03/6359525694436325221322078085_dwaynejohnson.jpg',
    price: 37854.33,
    stock: 99,
  },
  {
    name: 'Geodude',
    picture: 'http://az616578.vo.msecnd.net/files/2016/04/03/6359525694436325221322078085_dwaynejohnson.jpg',
    price: 70.50,
    stock: 50,
  },
  {
    name: 'Gabbro',
    picture: 'http://az616578.vo.msecnd.net/files/2016/04/03/6359525694436325221322078085_dwaynejohnson.jpg',
    price: 33.10,
    stock: 60,
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
  },
  {
    name: 'Casual',
    image: 'https://qph.ec.quoracdn.net/main-qimg-c24d1fe669b03a09c7bc7537f08e283a-c'
  },
  {
    name: 'Luxury',
    image: 'https://qph.ec.quoracdn.net/main-qimg-c24d1fe669b03a09c7bc7537f08e283a-c'
  },
  {
    name: 'Smart',
    image: 'https://qph.ec.quoracdn.net/main-qimg-c24d1fe669b03a09c7bc7537f08e283a-c'
  },
  {
    name: 'Classic',
    image: 'https://qph.ec.quoracdn.net/main-qimg-c24d1fe669b03a09c7bc7537f08e283a-c'
  }
];


const purchasedItemData = [
  {
    purchasePrice: 55.10,
    purchaseQuantity: 1,
    itemId: 2,
    orderId: 1
  },
  {
    purchasePrice: 15.00,
    purchaseQuantity: 2,
    itemId: 3,
    orderId: 2
  },
  {
    purchasePrice: 5.60,
    purchaseQuantity: 1,
    itemId: 4,
    orderId: 2
  },
  {
    purchasePrice: 10.01,
    purchaseQuantity: 2,
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
    statusName: 'ordered',
    userId: 3
  },
  {
    statusName: 'dwayning',
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
const createUsers = () => {
  return Promise.all(userData.map(user => {
    return User.create(user)
  }))
};

// Catergory Seeding
const createCategorys = () => {
  return Promise.all(categoryData.map(category => {
    return Category.create(category)
  }))
};

// Item Seeding
const createItems = () => {
  return Promise.all(itemData.map(item => {
    return Item.create(item)
    .then(createdItem => createdItem.setCategories([Math.ceil(Math.random() * 3), Math.ceil(Math.random() * 4) + 3]))
  }))
};

// PurchasedItem Seeding
const createPurchasedItems = () => {
  return Promise.all(purchasedItemData.map(purchasedItem => {
    return PurchasedItem.create(purchasedItem)
  }))
};


// CartItem Seeding
const createCartItems = () => {
  return Promise.all(cartItemData.map(cartItem => {
    return CartItem.create(cartItem)
  }))
};


// Status Data Seeding
const createStatus = () => {
  return Promise.all(statusData.map(status => {
    return Status.create(status)
  }))
};

// Order Data Seeding
const createOrders = () => {
  return Promise.all(orderData.map(order => {
    return Order.create(order)
  }))
};


// Review Data Seeding
const createReviews = () => {
  return Promise.all(reviewData.map(review => {
    return Review.create(review)
  }))
};


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
