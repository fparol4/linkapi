import { Router } from 'express'
import { ARouter } from '../abstracts/router.abstract'
import { ControllerAdapter } from '../adapters/controller.adapter'
import MainController from '../controllers/main.controller'

export class MainRouter extends ARouter {
  public readonly router: Router
  public readonly basePath: string

  public routes (): void {
    this.router.get('/', ControllerAdapter.adapt(MainController.index))
    this.router.get('*', ControllerAdapter.adapt(MainController.notFound))
  }
}
