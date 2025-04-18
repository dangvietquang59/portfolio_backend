import { IRequest, IResponse } from '../types';

export const errorHandler = (
  err: Error,
  _req: IRequest,
  res: IResponse,
  _next: Function
) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
}; 