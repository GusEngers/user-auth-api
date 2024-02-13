const app = require('./src/app');
const { db } = require('./src/config/db');
const { PORT } = require('./src/utils/constants');

/**
 * @description Ejecuta la conexión a la base de datos y pone en marcha el servidor
 */
async function main() {
  try {
    await db();
    app.listen(PORT, () => {
      console.log(`[INFO] Server listening on port: ${PORT}`);
    });
  } catch (error) {
    console.log(`[ERROR] Error starting server: ${error.message}`);
    process.exit(1);
  }
}

main();
