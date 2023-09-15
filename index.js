const app = require('./src/app');
const db = require('./src/db');
require('dotenv').config();

async function main() {
  try {
    // await db();
    app.listen(process.env.PORT, () => {
      console.log('[INFO] Server listening on port:', process.env.PORT);
    });
  } catch (error) {
    console.error('[ERROR] Error starting server:', error);
    process.exit(1);
  }
}

main();
