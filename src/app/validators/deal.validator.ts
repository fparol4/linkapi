import { Request, Response, NextFunction } from 'express'
import ValidatorHelper from '../helpers/validator.helper'

class DealValidator {
  public async index (request: Request, response: Response, next: NextFunction): Promise<void> {
    const validatedQuery = await ValidatorHelper.validateQuery(request.query)
    request.query = validatedQuery
    return next()
  }

  public async store (request: Request, response: Response, next: NextFunction): Promise<void> {
    const { validator } = ValidatorHelper
    const bodySchema = validator.object().shape({
      current: validator.object().shape({
        id: validator.number().min(0).defined(),
        title: validator.string().defined(),
        value: validator.number().min(0).defined(),
        currency: validator.string().min(3).defined(),
        org_name: validator.string().min(3).defined(),
        won_time: validator.string().nullable(),
        status: validator.string().oneOf(['won', 'lost', 'open']).defined()
      })
    })

    request.body = await ValidatorHelper.validate(bodySchema, request.body)
    return next()
  }
}

export default new DealValidator()
