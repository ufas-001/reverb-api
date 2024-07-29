/* eslint-disable */
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export interface YourRequest {
  input: string;
}

export interface YourResponse {
  output: string;
}

export interface YourService {
  yourMethod(request: YourRequest): Observable<YourResponse>;
}
