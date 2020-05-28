import '../enviroment'
import Express from 'express'

/** Routers */
import { MainRouter } from './app/routers/main.router'

/** Interfaces */
import { IARouter } from './app/interfaces/router.interfaces'

class App {
  public static routers: IARouter[] = [
    new MainRouter()
  ]

  public app: Express.Application

  constructor () {
    this.app = Express()
    this.middlewares()
    this.routers()
  }

  private middlewares (): void {}

  private routers (): void {
    App.routers.forEach(({ basePath, router }) => {
      this.app.use(basePath, router)
    })
  }
}

export default new App().app
