export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) return;

    let cartItem = this.cartItems.find(item => item.product.id === product.id);

    if (cartItem) {
      cartItem.count++;
    } else  {
      this.cartItems.push({product: product, count: 1});
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {

this.cartItems.forEach((cartItem, index) => {
  if (cartItem.product.id == productId) {
    cartItem.count += amount;
    if (cartItem.count == 0) {
      this.cartItems.splice(index, 1);
    }
  }
  this.onProductUpdate(cartItem);
})
  }

  isEmpty() {
   return this.cartItems.length === 0;
  }

  getTotalCount() {
      let totalPrice = 0;
      this.cartItems.forEach((item) => totalPrice += item.count);
      return totalPrice;
  }

  getTotalPrice() {
       let price = 0;
       this.cartItems.forEach((item) => price += item.product.price * item.count);
       return price;
  }

  onProductUpdate(cartItem) {


    this.cartIcon.update(this);
  }
}

