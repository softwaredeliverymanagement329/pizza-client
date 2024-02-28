export function setupStore(element) {
  const addStoreButtonEl = element.querySelector('#store-add-btn');
  const addStoreTextEl = element.querySelector('#store-add-text');
  addStoreButtonEl.addEventListener('click', (e) => {
    const storeName = addStoreTextEl.value;
    fetch(`/api/store/${storeName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => drawTable(data));
  });

  getStores();
}

function getStores() {
  fetch('/api/store')
    .then((res) => res.json())
    .then((data) => drawTable(data));
}

function drawTable(data) {
  const storeTableEl = document.querySelector('#store-table');
  storeTableEl.innerHTML = '';
  data.store.forEach((s) => {
    const rowEl = document.createElement('tr');
    const nameEl = document.createElement('td');
    nameEl.innerText = s.name;
    const dateEl = document.createElement('td');
    dateEl.innerText = s.date;
    rowEl.appendChild(nameEl);
    rowEl.appendChild(dateEl);
    storeTableEl.appendChild(rowEl);
  });
}
