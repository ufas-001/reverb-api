import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { grpcClientOptions } from './grpc-client.options';
import {
  PredictionServiceClient,
  PredictResponse,
  PredictRequest,
} from './prediction';

@Injectable()
export class PredictionGrpcService implements OnModuleInit {
  @Client(grpcClientOptions)
  private readonly client: ClientGrpc;

  private predictionService: PredictionServiceClient;

  onModuleInit() {
    this.predictionService =
      this.client.getService<PredictionServiceClient>('PredictionService');
  }

  predict(message: string): Observable<PredictResponse> {
    const request: PredictRequest = { message };
    return this.predictionService.predict(request);
  }
}
