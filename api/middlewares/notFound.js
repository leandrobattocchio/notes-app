const { DB_DISCONNECT } = require('../mongo')

module.exports = (request, response) => {
  response.status(404).send({ error: 'ERROR 404' })
  DB_DISCONNECT()
}
