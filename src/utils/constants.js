require('dotenv').config();

module.exports = {
  // Configuración de la Aplicación
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI,
  TOKEN: process.env.TOKEN,
  isProduction: () => process.env.NODE_ENV === 'development',

  // Constantes de la Aplicación
  HEADER_TOKEN: 'x-authorization-token',
  HEADER_API_KEY: 'x-authorization-api-key',
  STATUS_ACTIVE: 'active',
  STATUS_INACTIVE: 'inactive',
};
