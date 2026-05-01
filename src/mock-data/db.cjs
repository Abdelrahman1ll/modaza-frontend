const fs = require('fs');
const path = require('path');

const readJSON = (file) => JSON.parse(fs.readFileSync(path.join(__dirname, file), 'utf8'));

module.exports = () => ({
  products: readJSON('products.json'),
  categories: readJSON('categories.json'),
  colors: readJSON('colors.json'),
  reviews: readJSON('reviews.json'),
  "discount-codes": readJSON('discount-codes.json'),
  carts: readJSON('carts.json'),
  wishlist: readJSON('wishlist.json'),
  orders: readJSON('orders.json'),
  users: readJSON('users.json'),
  email: readJSON('email.json')
});
