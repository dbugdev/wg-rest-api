require('dotenv').config()
const { PORT, MONGO_URL, JWT_SECRET } = process.env
module.exports = { PORT, MONGO_URL, JWT_SECRET }
