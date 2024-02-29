/**
 * @description Error personalizado para respuestas HTTP
 */
class ResponseError extends Error {
  /**
   * @param {string} message Mensaje genérico del error
   * @param {number} statusCode Código de estado HTTP
   * @param {[string]} errors Lista opcional de errores personalizados
   */
  constructor(message, statusCode, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }

  /**
   * @description Genera un objeto con el mensaje, código de estado y errores opcionales
   * @returns Objeto de error
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

module.exports = { ResponseError };
