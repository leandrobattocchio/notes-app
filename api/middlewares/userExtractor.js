const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = null

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  let userDecoded = false
  try {
    userDecoded = jwt.verify(token, process.env.SECRET)
  } catch (error) {
    return next(error)
  }

  if (!token || !userDecoded.id) {
    return response.status(401).send('invalid token authorization')
  }

  request.userId = userDecoded.id
  next()
}
