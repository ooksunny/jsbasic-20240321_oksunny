export function initCarousel () {
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