// package: yourpackage
// file: src/grpc/example.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as src_grpc_example_pb from "../../src/grpc/example_pb";

interface IYourServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    yourMethod: IYourServiceService_IYourMethod;
}

interface IYourServiceService_IYourMethod extends grpc.MethodDefinition<src_grpc_example_pb.YourRequest, src_grpc_example_pb.YourResponse> {
    path: "/yourpackage.YourService/YourMethod";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<src_grpc_example_pb.YourRequest>;
    requestDeserialize: grpc.deserialize<src_grpc_example_pb.YourRequest>;
    responseSerialize: grpc.serialize<src_grpc_example_pb.YourResponse>;
    responseDeserialize: grpc.deserialize<src_grpc_example_pb.YourResponse>;
}

export const YourServiceService: IYourServiceService;

export interface IYourServiceServer {
    yourMethod: grpc.handleUnaryCall<src_grpc_example_pb.YourRequest, src_grpc_example_pb.YourResponse>;
}

export interface IYourServiceClient {
    yourMethod(request: src_grpc_example_pb.YourRequest, callback: (error: grpc.ServiceError | null, response: src_grpc_example_pb.YourResponse) => void): grpc.ClientUnaryCall;
    yourMethod(request: src_grpc_example_pb.YourRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: src_grpc_example_pb.YourResponse) => void): grpc.ClientUnaryCall;
    yourMethod(request: src_grpc_example_pb.YourRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: src_grpc_example_pb.YourResponse) => void): grpc.ClientUnaryCall;
}

export class YourServiceClient extends grpc.Client implements IYourServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public yourMethod(request: src_grpc_example_pb.YourRequest, callback: (error: grpc.ServiceError | null, response: src_grpc_example_pb.YourResponse) => void): grpc.ClientUnaryCall;
    public yourMethod(request: src_grpc_example_pb.YourRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: src_grpc_example_pb.YourResponse) => void): grpc.ClientUnaryCall;
    public yourMethod(request: src_grpc_example_pb.YourRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: src_grpc_example_pb.YourResponse) => void): grpc.ClientUnaryCall;
}
