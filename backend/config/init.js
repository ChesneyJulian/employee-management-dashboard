const mysql = require('mysql2/promise');
require('dotenv').config();
// allows you to initialize database using npm run prewatch as defined in package.json
(async () => {
  try {
    const { DB_NAME } = process.env;
    const db = await mysql.createConnection('mysql://root@127.0.0.1:3306');

    const [header] = await db.execute(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);

    console.log(`${DB_NAME} ${!header.warningStatus ? 'created' : 'exists'}`);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();