class GoneError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 410;
  }
}

module.exports = GoneError;
