import { IHttpResponse } from '../interfaces/http.interfaces'
import { Request } from 'express'

export type TAction = (request: Request) => IHttpResponse
