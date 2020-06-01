import { Request, Response, NextFunction } from 'express'
import ValidatorHelper from '../helpers/validator.helper'

class DealValidator {
  public async index (request: Request, response: Response, next: NextFunction): Promise<void> {
    const { validator } = ValidatorHelper

    const additionalFilters = {
      title: validator.string().default(''),
      min_value: validator.number().min(0).default(0)
    }

    const validatedQuery = await ValidatorHelper.validateFilters(request.query, additionalFilters)
    request.query = validatedQuery
    return next()
  }

  public async aggregate (request: Request, response: Response, next: NextFunction): Promise<void> {
    const { validator } = ValidatorHelper

    const additionalFilters = {
      min_total: validator.number().min(0).default(0),
      min_date: validator.string()
    }

    request.query = await ValidatorHelper.validateFilters(request.query, additionalFilters)
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
