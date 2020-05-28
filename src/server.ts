import app from './app'
import { ExpressConfiguration } from './configurations/express.configuration'

class Server {
  public readonly server: Express.Application
  public readonly port: number

  constructor () {
    this.port = ExpressConfiguration.port
    this.server = app.listen(this.port)
    console.warn(`Server running on ${ExpressConfiguration.host}:${ExpressConfiguration.port}`)
  }
}

export default new Server()
