import '../enviroment'
import Express from 'express'

class App {
  public app: Express.Application

  constructor () {
    this.app = Express()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {}

  private routes (): void {}
}

export default new App().app
