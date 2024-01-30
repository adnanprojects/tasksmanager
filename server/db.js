const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "database",
  host: "localhost",
  port: 5432,
  database: "tasks",
});

module.exports = pool;
