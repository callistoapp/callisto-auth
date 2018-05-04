import {jwtConfig} from "../../config"
import jwt from "jwt-simple"
import messages from "../protos/authorization_pb"
import * as _ from "lodash"
import services from "../protos/authorization_grpc_pb";
import UserModel from '../models/user'

const db = new UserModel()

const server = new grpc.Server()

server.addService(services.AuthorizeService, {authorize: isAuthorized})
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
server.start()

function isAuthorized(call, callback) {
  let info = new messages.AuthInfo()
  const token = call.request.getToken()
  const decodedToken = jwt.decode(token, jwtConfig.jwtSecret)
  db.getUser({id: decodedToken.id}, (err, user) => {
    if (err === null && !_.isNil(user)) {
      info.setLogged(true)
      callback(null, info)
    } else {
      info.setLogged(false)
      callback(null, info)
    }
  })
}
