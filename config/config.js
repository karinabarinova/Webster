require('dotenv').config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD, EMAIL_USER, EMAIL_PASS } = process.env;

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "database_development",
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "database_test",
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": '',
    "password": DB_PASSWORD,
    "database": "database_production",
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "emailFrom": "info@chronos.com",
  "smtpOption": {
      "host": "smtp.gmail.com",
  "port": 587,
  "auth": {
      "user": EMAIL_USER,
      "pass": EMAIL_PASS
      }
  }
}
