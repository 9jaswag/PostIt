let sessionStorage = {};

export default {
  setItem(key, value) {
    return Object.assign(sessionStorage, { [key]: value });
  },
  getItem(key) {
    return sessionStorage[key];
  },
  removeItem(key) {
    return delete sessionStorage[key];
  },
  clear() {
    sessionStorage = {};
  }
};
