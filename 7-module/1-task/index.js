import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
    this.scroll();
  }
  render() {
   let ribbon = createElement(`
      <div class="ribbon">
           <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

      <nav class="ribbon__inner">
      ${this.categories.map(category => this.renderCategory(category)).join('')}
      </nav>

    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
`);
    return ribbon;
  }

    renderCategory(category) {
    return `
      <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`;
    }

  scroll() {
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let arrowRight = this.elem.querySelector('.ribbon__arrow_right');

    ribbonInner.addEventListener("click",  this.onCategoryClick.bind(this));
    ribbonInner.addEventListener("scroll",  this.onScroll.bind(this));

    arrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

      arrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });
  }
onCategoryClick(event) {
  event.preventDefault();
  let target = event.target;
  if (target.classList.contains('ribbon__item')) {
    let activeItem = this.elem.querySelector('ribbon__item_active');
    if (activeItem) {
      activeItem.classList.remove('ribbon__item_active');
    }
    target.classList.add('ribbon__item_active');

    let categoryId = target.dataset.id;
    let ribbonSelectEvent = new CustomEvent('ribbon-select', {
      detail: categoryId,
      bubbles: true
    });
    this.elem.dispatchEvent(ribbonSelectEvent);
  }


}
onScroll() {
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let scrollLeft = ribbonInner.scrollLeft;
    let scrollWidth = ribbonInner.scrollWidth;
    let clientWidth = ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    let arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let arrowRight = this.elem.querySelector('.ribbon__arrow_right');

    if (scrollLeft === 0) {
      arrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      arrowLeft.classList.add('ribbon__arrow_visible')
    }

     if (scrollRight < 1 ) {
      arrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      arrowRight.classList.add('ribbon__arrow_visible')
    }
}
}
