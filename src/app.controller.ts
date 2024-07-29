import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get
} from '@nestjs/common';
import { AppService } from './app.service';
import { PredictionGrpcService } from './grpc/prediction.service';
import { lastValueFrom } from 'rxjs';



@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly predictionService: PredictionGrpcService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('predict')
  async predict(@Body() body: { message: string }) {
    try {
      const response = await lastValueFrom(
        this.predictionService.predict(body.message),
      );
      return { answer: response.answer };
    } catch (error) {
      throw new HttpException(
        'Prediction failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
