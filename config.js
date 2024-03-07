require('dotenv').config()

module.exports = {
  server: {
    port: process.env.PORT || 3000
  },
  fillOut: {
    url: process.env.API_URL,
    key: process.env.API_KEY,
  }
}
