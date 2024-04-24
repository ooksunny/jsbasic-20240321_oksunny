import createElement from '../../assets/lib/create-element.js';
//import {initCarousel} from '../../5-module/3-task/index.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
    this.addEventListeners();
    this.initCarousel();
  }

  render() {
    this.elem = createElement (`
    <div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </div>
  <div class="carousel__arrow carousel__arrow_left">
    <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
  </div>
  </div>
    `);

    this.slider = createElement(`<div class="carousel__inner"></div>`);
    this.elem.append(this.slider);

    this.slides.forEach((slide) => {
    this.slider.append(
    createElement (`
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
    `)
);  
});
  }

    initCarousel () {
      let carousel = this.elem;
      let currentSlide = 0;
      let carouselImgCount = carousel.querySelectorAll(".carousel__slide").length;


  let arrowLeft = carousel.querySelector('.carousel__arrow_left');
  let arrowRight = carousel.querySelector('.carousel__arrow_right');
  let inner = carousel.querySelector('.carousel__inner');

  flipping();

  carousel.addEventListener("click", function (event) {
    if (event.target.closest('.carousel__arrow_right')) {
      currentSlide++;
    flipping();
    } else if (event.target.closest('.carousel__arrow_left')) {
      currentSlide--;
      flipping();
    }
      });
  
function flipping() {
  let offset = inner.offsetWidth;

         if (currentSlide == 0) {
            arrowLeft.style.display = 'none';
            arrowRight.style.display = '';
          }
          else if (currentSlide == carouselImgCount - 1){
            arrowLeft.style.display = '';
            arrowRight.style.display = 'none';
          }
          else {
            arrowLeft.style.display = '';
            arrowRight.style.display = '';
          }
      

        inner.style.transform = `translateX(-${offset * currentSlide}px)`;
      
        }
      
      }
 
      addEventListeners() {
        this.elem.addEventListener('click', event => {
          if (event.target.closest('.carousel__button')) {
            let id = event.target.closest('.carousel__slide').dataset.id;
            this.elem.dispatchEvent(new CustomEvent("product-add", {
                detail: id,
                bubbles: true
            }));
        }
        })
      }
    }