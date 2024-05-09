import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  #slider;

  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.addEventListener();

  }
 get elem() {
    return this.#slider;
 }
  render () {
    this.#slider = createElement( `
      <div class="slider">
        <div class="slider__thumb">
            <span class="slider__value">${this.value}</span>
      </div>
    <div class="slider__progress"></div>
    <div class="slider__steps"></div>
     </div>
    `);


    this.updateSlider(true);
  }


updateSlider(value) {

  let thumb = this.elem.querySelector('.slider__thumb');
  let progress = this.elem.querySelector('.slider__progress');
  let step = this.elem.querySelector('.slider__steps');

  thumb.firstElementChild.textContent = '' + this.value;
  let leftPercents = this.value / (this.steps - 1) * 100;
  thumb.style.left = `${leftPercents}%`;
  progress.style.width = `${leftPercents}%`;

  if (value) {
  let span;
  for (let i= 0; i < this.steps; i++) {
    span = document.createElement('span');
    step.append(span);
  if (this.value === i) {
  span.classList.toggle('slider__step-active');
}

  }
  this.#slider.append(step);
} else {
  step.querySelector('.slider__step-active').classList.toggle('slider__step-active');
  step.children[this.value].classList.toggle('slider__step-active');
}
}
  addEventListener(){
    this.elem.addEventListener('click', event => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;
    this.setValue(valuePercents);
    })
  }


  setValue(valuePercents) {
      let value = Math.round(valuePercents / (100 / (this.steps - 1)));
      valuePercents = value / (this.steps - 1) * 100;

      if (value >= 0 && value < this.steps && value !== this.value) {
          this.value = value;
          this.updateSlider();
          this.elem.dispatchEvent(new CustomEvent("slider-change", {
              detail: this.value,
              bubbles: true
          }));
      }
  }
  }

