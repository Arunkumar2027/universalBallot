// db.js

const { Pool } = require('pg');

// Create a new Pool instance
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'vote',
  password: 'your_password',
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;
