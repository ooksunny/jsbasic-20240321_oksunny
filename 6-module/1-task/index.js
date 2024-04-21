/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows
    this.elem = this.createTable();
  }

createTable(){
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  
  let headers = ["Имя", "Возраст", "Зарплата", "Город", " "]
  let headerRow = document.createElement('tr');
  
  headers.forEach (header => {
    let th = document.createElement('th');
    th.textContent = header
    headerRow.appendChild(th);
  });

 thead.appendChild(headerRow);
 table.appendChild(thead);

this.rows.forEach (rowData => {
  let row = document.createElement('tr');
  
  Object.values(rowData).forEach (value => {
    let td = document.createElement('td');
    td.textContent = value;
    row.appendChild(td);
  });
  
  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.addEventListener('click', () => {
    tbody.removeChild(row);
  });
  
  let td = document.createElement('td');
   td.appendChild(deleteButton);
   row.appendChild(td);

   tbody.appendChild(row);
});

 table.appendChild(tbody);
            return table;
}
}