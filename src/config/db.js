const { connect } = require('mongoose');
const { DB_URI } = require('../utils/constants');

/**
 * @description Establece la conexión a la base de datos
 */
async function db() {
  try {
    await connect(DB_URI);
    console.log('[INFO] Database connecting sucessfully');
  } catch (error) {
    console.log(`[ERROR] Error connecting database: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { db };
