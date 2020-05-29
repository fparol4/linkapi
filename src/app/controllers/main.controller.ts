import { IHttpResponse } from '../interfaces/http.interfaces'
import { NotFoundError } from '../errors/http.errors'

class MainController {
  public async index (): Promise<IHttpResponse> {
    return {
      status: 200,
      message: 'helloworld'
    }
  }

  public async notFound (): Promise<IHttpResponse> {
    throw new NotFoundError()
  }
}

export default new MainController()
