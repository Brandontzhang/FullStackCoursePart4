require('dotenv').config({ path: './.env' })

MONGODB_URL = process.env.MONGODB_URL
PORT = process.env.PORT

module.exports = {
    MONGODB_URL,
    PORT
}