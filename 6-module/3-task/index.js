import createElement from '../../assets/lib/create-element.js';
//import {initCarousel} from '../../5-module/3-task/index.js';



export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
    this.addEventListeners();
    this.initCarousel();
  }

  render() {
    let slides = createElement (`
    <div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </div>
  <div class="carousel__arrow carousel__arrow_left">
    <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
  </div>
    <div class="carousel__inner">
    ${this.slides.map(slide =>  `
  <div class="carousel__inner">
    <div class="carousel__slide" data-id="${slide.id}">
  <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
  <div class="carousel__caption">
    <span class="carousel__price">€${slide.price.toFixed(2)}</span>
    <div class="carousel__title">${slide.name}</div>
    <button type="button" class="carousel__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
  </div>
</div>
`).join('')}
</div>
</div>
    `
  )
    return slides;
    
    
  }
  addEventListeners() {
    this.elem.addEventListener('click', event => {
      if (event.target.closest('.carousel__button')) {
        let slideId = event.target.closest('.carousel__slide').dataset.id;
        this.elem.dispatchEvent(new CustomEvent("product-add", {
            detail: slideId,
            bubbles: true
        }));
    }
    })
    document.addEventListener("DOMContentLoaded", () => {
     function initCarousel () {
        const slider = document.querySelector('.carousel__inner');
        const arrowLeft = document.querySelector('.carousel__arrow_left');
        const arrowRight = document.querySelector('.carousel__arrow_right');
        const slideWidth = slider.offsetWidth;
        let currentSlide = 0;
      
        if (currentSlide === 0) {
          arrowLeft.style.display = 'none';
        }
      
        function goToSlide(index) {
          if (index < 0 || index >= slider.children.length){
            return
          }
          currentSlide = index;
          slider.style.transform = `translateX(${-index * slideWidth}px)`;
      
          if (currentSlide === 0) {
            arrowLeft.style.display = 'none';
            arrowRight.style.display = '';
          }
          else if (currentSlide === slider.children.length - 1){
            arrowLeft.style.display = '';
            arrowRight.style.display = 'none';
          }
          else {
            arrowLeft.style.display = '';
            arrowRight.style.display = '';
          }
      
      
        }
      
        arrowLeft.addEventListener('click', () => {
       goToSlide(currentSlide-1);
        });
      
        arrowRight.addEventListener('click', () => {
       goToSlide(currentSlide + 1);
        });
      }
    });
  }
 
}
