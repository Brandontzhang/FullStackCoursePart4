require('dotenv').config({ path: './.env' })

MONGODB_URL = process.env.MONGODB_URL
PORT = process.env.PORT

if (process.env.NODE_ENV === 'test') {
    MONGODB_URL = process.env.TEST_MONGODB_URL
}

module.exports = {
    MONGODB_URL,
    PORT
}