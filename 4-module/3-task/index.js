function highlight (table) {

  for (let i = 0; i < table.rows.length; i++) {

    if (table.rows[i].cells[3].dataset.available == 'true') {
      table.rows[i].classList.add('available');
    }

     if (table.rows[i].cells[3].dataset.available == 'false') {
      table.rows[i].classList.add('unavailable');
    }

     if (!table.rows[i].cells[3].dataset.available) {
      table.rows[i].setAttribute('hidden', '');
    }

    if (table.rows[i].cells[2].innerHTML === 'm') {
      table.rows[i].classList.add('male');
    }

    if (table.rows[i].cells[2].innerHTML === 'f') {
      table.rows[i].classList.add('female');
    }

    if (table.rows[i].cells[1].innerHTML < 18) {
      table.rows[i].style.textDecoration = "line-through";
    }
  }
}
