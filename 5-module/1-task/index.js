function hideSelf() {
  const button = document.querySelector('.hide-self-button');
  button.setAttribute('hidden', 'true');
}
document.querySelector('.hide-self-button').addEventListener('click', hideSelf);
