const app = require('./app')
const port = process.env.PORT || 3000
const grpc = require('grpc');
const services = require('./app/protos/authorization_grpc_pb');
const messages = require('./app/protos/authorization_pb');

const server = new grpc.Server();
server.addService(services.AuthorizeService, {authorize: isAuthorized});
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();

function isAuthorized(call, callback) {
  let info = new messages.AuthInfo();
  info.setLogged(true)
  console.log(call.request.getToken());
  callback(null, info);
}

app.listen(port, function (err) {
  if (err) {
    throw err
  }
  console.log(`server is listening on ${port}...`)
})
