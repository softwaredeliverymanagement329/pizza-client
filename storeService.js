class StoreService {
  constructor() {
    this.useNetwork = false;
    this.localStores = { store: [] };
  }

  getStores(callback) {
    if (this.useNetwork) {
      this.fetchRequest(callback, 'GET', '/api/store');
    } else {
      callback(this.localStores);
    }
  }

  createStore(storeName, callback) {
    if (this.useNetwork) {
      this.fetchRequest(callback, 'POST', `/api/store/${storeName}`);
    } else {
      this.localStores.store.push({ name: storeName, date: new Date().toLocaleString() });
      callback(this.localStores);
    }
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
