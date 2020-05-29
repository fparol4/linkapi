import { IHttpResponse } from '../interfaces/http.interfaces'

class HttpRequestHelper {
  public badRequest (message: string = 'This request is invalid'): IHttpResponse {
    return {
      status: 400,
      message: message
    }
  }

  public notFound (message: string = 'Route not found'): IHttpResponse {
    return {
      status: 404,
      message: message
    }
  }
}

export default new HttpRequestHelper()
