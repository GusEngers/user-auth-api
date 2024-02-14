require('dotenv').config();

module.exports = {
  // Configuración de la Aplicación
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI,
  TOKEN: process.env.TOKEN,
  isProduction: () => process.env.NODE_ENV === 'development',

  // Constantes de la Aplicación
  X_AUTHORIZATION_TOKEN: 'x-authorization-token',
  X_AUTHORIZATION_API_KEY: 'x-authorization-api-key',
  STATUS_ACTIVE: 'active',
  STATUS_INACTIVE: 'inactive',

  // Expresiones reulares
  REGEX_EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  REGEX_PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};
