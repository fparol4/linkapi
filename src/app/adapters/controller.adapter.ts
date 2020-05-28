import { Request, Response } from 'express'
import { TAction } from '../types/controller.types'
import { IHttpResponse } from '../interfaces/http.interfaces'

export class ControllerAdapter {
  public static adapt (action: TAction) {
    return (request: Request, response: Response) => {
      const httpResponse: IHttpResponse = action(request)
      response.status(httpResponse.status).json({
        status: httpResponse.status,
        message: httpResponse.message,
        data: httpResponse.body
      })
    }
  }
}
