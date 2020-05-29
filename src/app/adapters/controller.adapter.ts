import { Request, Response } from 'express'
import { TAction } from '../types/controller.types'
import { IHttpResponse } from '../interfaces/http.interfaces'

export class ControllerAdapter {
  public static adapt (action: TAction) {
    return async (request: Request, response: Response) => {
      const httpResponse: IHttpResponse = await action(request)
      return response.status(httpResponse.status).json({
        status: httpResponse.status,
        message: httpResponse.message,
        data: httpResponse.body
      })
    }
  }
}
