const { connect } = require('mongoose');
const { DB_URI } = require('./utils/constants');

/**
 * Establece la conexión entre la aplicación y la base de datos
 */
async function db() {
  try {
    await connect(DB_URI);
    process.stdout.write('[INFO] Database connecting sucessfully');
  } catch (error) {
    process.stdout.write(`[ERROR] Error connecting database: ${error}\n`);
    process.exit(1);
  }
}

module.exports = db;
