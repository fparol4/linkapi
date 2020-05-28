import dotenv from 'dotenv'
import { resolve } from 'path'

enum Enviroments {
  PRODUCTION = '.env.production',
  DEVELOPMENT = '.env.development',
}

const enviroment = process.env.NODE_ENV || 'DEVELOPMENT'
dotenv.config({ path: resolve('enviroment', Enviroments[enviroment]) })
