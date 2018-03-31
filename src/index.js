import grpc from 'grpc'

import app from './app'
import services from './app/protos/authorization_grpc_pb'
import messages from './app/protos/authorization_pb'

const port = process.env.PORT || 3000
const server = new grpc.Server()

server.addService(services.AuthorizeService, {authorize: isAuthorized})
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
server.start()

function isAuthorized(call, callback) {
  let info = new messages.AuthInfo()
  info.setLogged(true)
  console.log(call.request.getToken())
  callback(null, info)
}

app.listen(port, function (err) {
  if (err) {
    throw err
  }
  console.log(`server is listening on ${port}...`)
})
