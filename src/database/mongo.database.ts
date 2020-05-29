import mongoose, { Connection } from 'mongoose'
import { DatabaseConnectionError } from '../app/errors/internal.errors'
import { MongodbConfiguration } from '../configurations/mongodb.configuration'

export class MongoDatabase {
  public connection: Connection

  constructor () {
    this.connection = mongoose.connection
    this.setHooks()
  }

  public connect (): void {
    mongoose.connect(MongodbConfiguration.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  }

  private setHooks (): void {
    this.connection.on('error', error => {
      const { message } = error
      throw new DatabaseConnectionError(`Error trying to connect into mongodb: ${message}`)
    })

    this.connection.on('open', () => console.warn('Mongodb connected successfully'))
  }
}

export default new MongoDatabase()
