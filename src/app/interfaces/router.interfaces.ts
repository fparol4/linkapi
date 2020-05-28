import { Router } from 'express'

export interface IARouter {
  basePath: string
  router: Router
}
