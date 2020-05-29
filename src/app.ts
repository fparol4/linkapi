import '../enviroment'
import 'express-async-errors'
import Express from 'express'

/** Routers */
import { MainRouter } from './app/routers/main.router'

/** Interfaces */
import { IARouter } from './app/interfaces/router.interfaces'

/** Middlewares */
import { ErrorHandlerMiddleware } from './app/middlewares/error-handler.middleware'

class App {
  public static routers: IARouter[] = [
    new MainRouter()
  ]

  public app: Express.Application

  constructor () {
    this.app = Express()
    this.middlewares()
    this.routers()
    this.handler()
  }

  private middlewares (): void {}

  private routers (): void {
    App.routers.forEach(({ basePath, router }) => {
      this.app.use(basePath, router)
    })
  }

  private handler (): void {
    this.app.use(ErrorHandlerMiddleware.handle)
  }
}

export default new App().app
