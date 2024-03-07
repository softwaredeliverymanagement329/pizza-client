class StoreService {
  constructor() {
    this.useNetwork = false;
    this.lambdas = {
      getStores: 'https://l4jzevaddlpr53lxtup5sy3ve40geiyy.lambda-url.us-east-1.on.aws/',
    };

    this.localStores = { store: [] };
  }

  getStores(callback) {
    if (this.useNetwork) {
      this.fetchRequest(callback, 'GET', '/api/store');
    } else if (this.lambdas.getStores) {
      this.fetchRequest(callback, 'GET', this.lambdas.getStores);
    } else {
      callback(this.readLocalStores());
    }
  }

  createStore(storeName, callback) {
    if (this.useNetwork) {
      this.fetchRequest(callback, 'POST', `/api/store/${storeName}`);
    } else {
      const newStore = { name: storeName, date: new Date().toLocaleString() };
      callback(this.writeLocalStore(newStore));
    }
  }

  readLocalStores() {
    const store =
      localStorage.getItem('store') ||
      `{"store": [{ "name": "Default Pizza Client localstorage", "date": "3/6/2024, 2:47:21 PM" }]}`;
    return JSON.parse(store);
  }

  writeLocalStore(newStore) {
    const stores = { store: [...this.readLocalStores().store, newStore] };
    localStorage.setItem('store', JSON.stringify(stores));
    return stores;
  }

  async fetchRequest(callback, method, path, headers = {}, body = null) {
    if (body) {
      headers = { ...headers, 'Content-Type': 'application/json' };
    }

    const options = {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(path, options);
    if (!response.ok) {
      throw new Error(`Service request failed: ${response.status}`);
    }

    if (callback) {
      const obj = await response.json();
      callback(obj);
    }
  }
}

const storeService = new StoreService();
export { storeService };
