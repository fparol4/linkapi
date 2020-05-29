import { Request, Response, NextFunction } from 'express'
import { AppError } from '../abstracts/app-error.abstract'

export class ErrorHandlerMiddleware {
  public static async handle (error: AppError, request: Request, response: Response, next: NextFunction): Promise<Response> {
    return response.json({
      message: error.message,
      status: error.status,
      errors: error.errors
    })
  }
}
