const { JWT_SECRET = "very-strong-key" } = process.env;
const PORT = 3000;
const LOCALHOST = "http://localhost";
const DB_ADDRESS = "mongodb://localhost:27017/mestodb";

module.exports = {
  JWT_SECRET,
  PORT,
  LOCALHOST,
  DB_ADDRESS,
};
