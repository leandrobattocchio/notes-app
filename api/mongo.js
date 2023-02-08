const mongoose = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI

module.exports = {
  DB_CONNECT: function () {
    return (
      mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('Database Connected')
      }).catch(error => console.error(error))

    )
  },
  DB_DISCONNECT: function () {
    return (mongoose.disconnect()
      .then(() => console.log('Database Disconnected'))
      .catch(error => console.error(error))
    )
  }
}
