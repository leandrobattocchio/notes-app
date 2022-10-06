const logger = (request, response, next) => {
  console.log(request.path)
  console.log(request.method)
  console.log('Ingresando...')
  next()
}

module.exports = logger
