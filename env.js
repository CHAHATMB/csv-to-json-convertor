const env = {
  database: "UserRecords",
  username: "postgres",
  password: "password",
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dropTable: true, // flag to control dropping of table when server starts
  csvfile: "users.csv",
  batchSize: 1000, // Adjust batch size for csv based on requirements
  port: 8080,
};

module.exports = env;
