export class Response<T> {
  message: string = 'success';
  payload: T = null;
  constructor(message?: string, payload?: T) {
    this.message = message;
    this.payload = payload;
  }
}
