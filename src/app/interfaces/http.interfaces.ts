export interface IHttpResponse {
  status: number
  message: string
  body?: object
  errors?: string[]
}
