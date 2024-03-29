import './storeElement.css';
import { storeService } from './storeService.js';

class StoreElement extends HTMLElement {
  constructor() {
    self = super();

    this.createAddInput();
    this.createAddStoreButton();
    this.createStoreTable();
    storeService.getStores((data) => this.drawTable(data));
  }

  createAddInput() {
    this.addStoreInput = self.appendChild(document.createElement('input'));
    this.addStoreInput.setAttribute('type', 'text');
    this.addStoreInput.setAttribute('placeholder', 'store name');
  }

  createAddStoreButton() {
    const addBtn = self.appendChild(document.createElement('button'));
    addBtn.textContent = 'Add';
    addBtn.addEventListener('click', (e) => {
      const storeName = this.addStoreInput.value;
      if (storeName !== '') {
        this.addStoreInput.value = '';
        storeService.createStore(storeName, (data) => this.drawTable(data));
      }
    });
  }

  createStoreTable() {
    const storeTable = self.appendChild(document.createElement('table'));

    const headerRow = storeTable.appendChild(document.createElement('tr'));
    const nameHeader = headerRow.appendChild(document.createElement('th'));
    nameHeader.innerText = 'Name';
    const dateHeader = headerRow.appendChild(document.createElement('th'));
    dateHeader.innerText = 'Date';

    this.tableBody = storeTable.appendChild(document.createElement('tbody'));
  }

  drawTable(data) {
    if (data?.store.length) {
      this.tableBody.innerHTML = '';
      data.store.forEach((s) => {
        const rowEl = document.createElement('tr');
        const nameEl = document.createElement('td');
        nameEl.innerText = s.name;
        const dateEl = document.createElement('td');
        dateEl.innerText = s.date;
        rowEl.appendChild(nameEl);
        rowEl.appendChild(dateEl);
        this.tableBody.appendChild(rowEl);
      });
    } else {
      this.tableBody.innerHTML = '<tr><td colspan="2">No stores defined</td></tr>';
    }
  }
}

customElements.define('action-store', StoreElement);
