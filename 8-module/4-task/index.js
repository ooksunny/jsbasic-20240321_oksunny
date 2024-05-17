import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
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

    let cartItem = this.cartItems.find(item => item.product.id == productId);
    cartItem.count += amount;

    if (cartItem.count === 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }
      this.onProductUpdate(cartItem);
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

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    let modalBody = createElement("<div></div>");

    for (let item of this.cartItems) {
      modalBody.append(this.renderProduct(item.product, item.count));
    }

    modalBody.append(this.renderOrderForm());

    this.modal.setTitle("Your order");
    this.modal.setBody(modalBody);
    this.modal.open();

    modalBody.addEventListener("click", event => {

      if (event.target.closest(".cart-counter__button_plus")) {
        this.updateProductCount(event.target.closest(".cart-product").dataset.productId, 1);
      }

      if (event.target.closest(".cart-counter__button_minus")) {
        this.updateProductCount(event.target.closest(".cart-product").dataset.productId, -1);
      }
    });

    let form = modalBody.querySelector(".cart-form");
    form.addEventListener("submit", event =>  {
      this.onSubmit(event);
    });
  }

  onProductUpdate(cartItem) {

    if (document.body.classList.contains('is-modal-open')) {
      let modalBody = document.querySelector('.modal__body');
      let productId = cartItem.product.id;

      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      if (cartItem.count === 0) {
      modalBody.querySelector(`[data-product-id="${productId}"]`).remove();
    }
    }

       if (this.isEmpty()) {
         this.modal.close();
    }

    this.cartIcon.update(this);
  }

  async onSubmit (event) {

    event.preventDefault();

    let modalBody = document.querySelector(".modal__body");

    let form = modalBody.querySelector('.cart-form');
    let formData = new FormData(form);

    modalBody.querySelector('button[type="submit"]').classList.add('is-loading');

    let response = await fetch(
     'https://httpbin.org/post', {
     method: 'POST',
     body: formData,
   });

    if (response.ok) {
      this.modal.setTitle("Success!");
      this.cartItems = [];
      modalBody.innerHTML =   `
       <div class="modal__body-inner">
  <p>
    Order successful! Your order is being cooked :) <br>
    We’ll notify you about delivery time shortly.<br>
    <img src="/assets/images/delivery.gif">
  </p>
</div>
`;
         this.cartIcon.update(this);
       }
     };


  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

