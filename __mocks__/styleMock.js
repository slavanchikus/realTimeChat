const cssModulesProxy = new Proxy({}, {
  get: function getter(target, key) {
    if (key === '__esModule') {
      return false;
    }
    return key;
  }
});

module.exports = cssModulesProxy;
