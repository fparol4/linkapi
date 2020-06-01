import { IHttpResponse } from '../interfaces/http.interfaces'
import { NotFoundError } from '../errors/http.errors'

class MainController {
  public async index (): Promise<IHttpResponse> {
    return {
      status: 200,
      message: 'Hello, server running'
    }
  }

  public async notFound (): Promise<IHttpResponse> {
    throw new NotFoundError()
  }
}

export default new MainController()
