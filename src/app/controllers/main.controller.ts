import { IHttpResponse } from '../interfaces/http.interfaces'
import { NotFoundError } from '../errors/http.errors'

class MainController {
  public index (): IHttpResponse {
    return {
      status: 200,
      message: 'helloworld'
    }
  }

  public notFound (): IHttpResponse {
    throw new NotFoundError()
  }
}

export default new MainController()
