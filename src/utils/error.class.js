/**
 * Error personalizado para solicitudes HTTP
 */
class ResponseError extends Error {
  constructor(message, statusCode = 500, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }

  /**
   * Retorna un objeto con los datos del mensaje de error,
   * el código de estado HTTP y los errores adicionales si
   * están disponibles
   */
  get response() {
    if (!this.errors.length) {
      return {
        message: this.message,
        statusCode: this.statusCode,
      };
    }
    return {
      message: this.message,
      statusCode: this.statusCode,
      errors: this.errors,
    };
  }
}

module.exports = ResponseError;
