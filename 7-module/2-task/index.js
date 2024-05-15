import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.closeButton = this.modal.querySelector('.modal__close');
    this.closeButton.addEventListener('click', this.close.bind(this));
    document.addEventListener('keydown', this.closeByEscape.bind(this));

  }

  render () {
    this.modal = createElement (
      `

      <div class="modal">

      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">

          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">

          </h3>
        </div>

        <div class="modal__body">

        </div>
      </div>

    </div>

      `
    );
return this.modal
  }

  open() {
    document.body.appendChild(this.modal);
    document.body.classList.add('is-modal-open')
    }

  setTitle(title) {
    this.modal.querySelector('.modal__title').textContent = title;
  }

  setBody(node) {
    let modalBody = this.modal.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.append(node);
  }

  close() {
    this.modal.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.closeByEscape.bind(this));
  }

  closeByEscape(event) {
    if (event.code === 'Escape') {
      this.close();
    }
   }
}
