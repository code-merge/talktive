class StorageUtil {
  getItem(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : {};
  }

  setItem(key, value) {
    if (!value) return null;
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
    return this;
  }
}

export default new StorageUtil();
