const { DB_DISCONNECT } = require('../mongo')

const ERROR_HANDLERS = {
  CastError: res => {
    res.status(400).send({ error: 'Id is malformed' }).end()
    DB_DISCONNECT()
  },
  JsonWebTokenError: res => {
    res.status(401).send({ error: 'invalidad token authorization' }).end()
    DB_DISCONNECT()
  },
  Default: res => {
    res.status(500).end()
    DB_DISCONNECT()
  }
}

module.exports = (error, request, response, next) => {
  const errorFunction = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.Default
  errorFunction(response)
}
