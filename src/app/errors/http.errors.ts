import { AppError } from '../abstracts/app-error.abstract'

export class NotFoundError extends AppError {
  constructor (message: string = 'Route not found') {
    super(message)
    this.status = 404
  }
}
