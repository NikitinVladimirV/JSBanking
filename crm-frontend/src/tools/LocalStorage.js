export class LocalStorage {
  constructor(keyName) {
    this.keyName = keyName;
  }

  getData() {
    const data = localStorage.getItem(this.keyName);

    if (data !== null) {
      return JSON.parse(data);
    }

    return [];
  }

  putData(element) {
    const data = this.getData();
    const index = data.indexOf(element);

    if (index === -1) {
      data.push(element);
      localStorage.setItem(this.keyName, JSON.stringify(data));
    }
  }
}

export const storageTool = new LocalStorage();
