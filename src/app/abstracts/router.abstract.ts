import { Router } from 'express'

/** Interfaces */
import { IARouter } from '../interfaces/router.interfaces'

export abstract class ARouter implements IARouter {
  public readonly router: Router
  public readonly basePath: string

  constructor (basePath = '/') {
    this.router = Router()
    this.basePath = basePath
    this.routes()
  }

  public abstract routes (): void
}
