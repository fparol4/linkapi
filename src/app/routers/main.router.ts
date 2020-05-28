import { Router } from 'express'
import { ARouter } from '../abstracts/router.abstract'

export class MainRouter extends ARouter {
  public readonly router: Router
  public readonly basePath: string

  public routes (): void {
    this.router.get('/', (req, res) => res.json('helloworld'))
  }
}
