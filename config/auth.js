require('dotenv').config();
const { SECRET } = process.env;

module.exports = {
    secret: SECRET
}