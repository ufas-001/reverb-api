// package: yourpackage
// file: src/grpc/example.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class YourRequest extends jspb.Message { 
    getInput(): string;
    setInput(value: string): YourRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): YourRequest.AsObject;
    static toObject(includeInstance: boolean, msg: YourRequest): YourRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: YourRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): YourRequest;
    static deserializeBinaryFromReader(message: YourRequest, reader: jspb.BinaryReader): YourRequest;
}

export namespace YourRequest {
    export type AsObject = {
        input: string,
    }
}

export class YourResponse extends jspb.Message { 
    getOutput(): string;
    setOutput(value: string): YourResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): YourResponse.AsObject;
    static toObject(includeInstance: boolean, msg: YourResponse): YourResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: YourResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): YourResponse;
    static deserializeBinaryFromReader(message: YourResponse, reader: jspb.BinaryReader): YourResponse;
}

export namespace YourResponse {
    export type AsObject = {
        output: string,
    }
}
