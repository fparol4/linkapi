import { IHttpResponse } from '../interfaces/http.interfaces'
import HttpHelper from '../helpers/http.helper'

class MainController {
  public index (): IHttpResponse {
    return {
      status: 200,
      message: 'helloworld'
    }
  }

  public notFound (): IHttpResponse {
    return HttpHelper.notFound()
  }
}

export default new MainController()
