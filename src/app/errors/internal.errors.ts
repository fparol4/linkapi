import { AppError } from '../abstracts/app-error.abstract'

export class DatabaseConnectionError extends AppError {
  constructor (message: string = 'An error occurred trying to load the database') {
    super(message)
    this.status = 500
    this.name = 'DatabaseConnectionError'
  }
}
