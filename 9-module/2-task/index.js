import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    this.carouselElement = document.querySelector("[data-carousel-holder]");
    this.carouselElement.append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    this.ribbonMenuElement = document.querySelector("[data-ribbon-holder]");
    this.ribbonMenuElement.append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({steps: 5, value: 3});
    this.stepSliderElement = document.querySelector("[data-slider-holder]");
    this.stepSliderElement.append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    this.cartIconElement = document.querySelector("[data-cart-icon-holder]");
    this.cartIconElement.append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    document.addEventListener('slider-change', (event) => this.productGrid.updateFilter({maxSpiciness: event.detail}));

    document.addEventListener('ribbon-select', (event) => this.productGrid.updateFilter({category: event.detail}));

    this.nuts = document.getElementById('nuts-checkbox');
    this.nuts.addEventListener('change', (event) => this.productGrid.updateFilter({noNuts: event.target.checked }));

    this.vegetarian = document.getElementById('vegeterian-checkbox');
    this.vegetarian.addEventListener('change', (event) => this.productGrid.updateFilter({vegeterianOnly: event.target.checked}));

    document.body.addEventListener('product-add', (event) => {
      let productAdd = this.json.find((product) => product.id === event.detail);

      if(!productAdd) {
        return;
      }

      this.cart.addProduct(productAdd);
    })

  }

  async render() {
    let response = await fetch('products.json');
    if (response.ok) {
      this.json = await response.json();
    }

    this.productGrid = new ProductsGrid(this.json);
    this.productGridElement = document.querySelector('[data-products-grid-holder]');
    this.productGridElement.innerHTML = '';
    this.productGridElement.append(this.productGrid.elem);

    this.productGrid.updateFilter({
    noNuts: document.getElementById('nuts-checkbox').checked,
    vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
    maxSpiciness: this.stepSlider.value,
    category: this.ribbonMenu.value
});

  }
}
