export class AppError extends Error {
  public message: string
  public status: number
  public errors?: string[]
}
