function toggleText() {
  let text = document.getElementById('text');
  let button = document.querySelector('.toggle-text-button')
  button.addEventListener('click', function() {
  if (text.hidden = !text.hidden) {
    text.setAttribute('hidden', '');
  } else {
  text.removeAttribute('hidden');
  }
  });
  }