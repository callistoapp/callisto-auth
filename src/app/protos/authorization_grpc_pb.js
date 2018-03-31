// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Authorization service definition
//
'use strict';
var grpc = require('grpc');
var authorization_authorization_pb = require('./authorization_pb.js');

function serialize_AuthInfo(arg) {
  if (!(arg instanceof authorization_authorization_pb.AuthInfo)) {
    throw new Error('Expected argument of type AuthInfo');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_AuthInfo(buffer_arg) {
  return authorization_authorization_pb.AuthInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CallistoToken(arg) {
  if (!(arg instanceof authorization_authorization_pb.CallistoToken)) {
    throw new Error('Expected argument of type CallistoToken');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_CallistoToken(buffer_arg) {
  return authorization_authorization_pb.CallistoToken.deserializeBinary(new Uint8Array(buffer_arg));
}


var AuthorizeService = exports.AuthorizeService = {
  authorize: {
    path: '/Authorize/Authorize',
    requestStream: false,
    responseStream: false,
    requestType: authorization_authorization_pb.CallistoToken,
    responseType: authorization_authorization_pb.AuthInfo,
    requestSerialize: serialize_CallistoToken,
    requestDeserialize: deserialize_CallistoToken,
    responseSerialize: serialize_AuthInfo,
    responseDeserialize: deserialize_AuthInfo,
  },
};

exports.AuthorizeClient = grpc.makeGenericClientConstructor(AuthorizeService);
