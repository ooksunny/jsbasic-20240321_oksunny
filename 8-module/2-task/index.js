import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.elem = createElement(`
    <div class="products-grid">
    <div class="products-grid__inner">
      <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
    </div>
  </div>`);

  this.productGridInner = this.elem.querySelector('.products-grid__inner');

 this.products.forEach(product => {
  let productCard = new ProductCard(product);
  this.productGridInner.append(productCard.elem);
 });
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.updateDisplay();
  }

 updateDisplay() {
  this.productGridInner.innerHTML = '';
  let filteredProducts = this.products.filter(product => {
  if (this.filters.noNuts && product.nuts) return false;
  if (this.filters.vegeterianOnly && !product.vegeterian) return false;
  if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) return false;
  if (this.filters.category && product.category !== this.filters.category) return false;

  return true;

  });


  filteredProducts.forEach(product => {
    const productCard = new ProductCard(product);
    this.productGridInner.appendChild(productCard.elem);
  });
  }
  }

