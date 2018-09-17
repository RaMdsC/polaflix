export class MixedResponse {

  data: any;
  statusCode: number;

  constructor(data: any, statusCode: number) {
    this.data = data;
    this.statusCode = statusCode;
  }
}
