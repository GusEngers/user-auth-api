const app = require('./src/app');
const db = require('./src/db');
const { PORT } = require('./src/utils/constants');

/**
 * Función encargada de ejecutar la conexión de la base de datos e iniciar
 * el servidor
 */
async function main() {
  try {
    await db();
    app.listen(PORT, () => {
      process.stdout.write(`[INFO] Server listening on port: ${PORT}\n`);
    });
  } catch (error) {
    process.stdout.write(`[ERROR] Error starting server: ${error}\n`);
    process.exit(1);
  }
}

main();
