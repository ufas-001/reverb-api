import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'prediction',
    protoPath: join(__dirname, 'prediction.proto'),
    url: 'localhost:50051',
  },
};
