import { Router } from 'express'
import { ARouter } from '../abstracts/router.abstract'
import { ControllerAdapter } from '../adapters/controller.adapter'
import DealController from '../controllers/deal.controller'

export class DealRouter extends ARouter {
  public readonly router: Router
  public readonly basePath: string = '/deals'

  public routes (): void {
    this.router.get('/', ControllerAdapter.adapt(DealController.index))
    this.router.post('/', ControllerAdapter.adapt(DealController.store))
    this.router.delete('/', ControllerAdapter.adapt(DealController.delete))
  }
}
