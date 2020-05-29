export interface IHttpResponse {
  status: number
  message: string
  body?: object
  errors?: string[]
}

export interface IFilters {
  limit: number
  page: number
}
