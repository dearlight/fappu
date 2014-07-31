function APIClient(options) {
  this.options = options || {};
  this.options.enforceHTTPS = false;
  this.options.baseURL = options.baseURL || "api.fakku.net";
}