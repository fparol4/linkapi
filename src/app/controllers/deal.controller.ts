import { IHttpResponse } from '../interfaces/http.interfaces'
import { Request } from 'express'
import { IPipedriveDeal, EDealStatus } from '../interfaces/pipedrive.interfaces'
import { IMDeal } from '../interfaces/deal.interfaces'
import { DealModel } from '../models/deal.model'
import { PaginateResult } from 'mongoose'

class DealController {
  public async index (request: Request): Promise<IHttpResponse> {
    const { query: { page = 1, limit = 10 } } = request

    const fixedPage = page > 0 ? Number(page) : 1
    const fixedLimit = limit > 0 ? Number(limit) : 10

    const deals: PaginateResult<IMDeal> = await DealModel
      .paginate({}, { page: fixedPage, limit: fixedLimit })

    return {
      status: 200,
      message: 'All deals found successfully',
      body: deals
    }
  }

  public async store (request: Request): Promise<IHttpResponse> {
    const { body: { current } }: {body: {current: IPipedriveDeal }} = request

    const existingDeal = await DealModel.findOne({ external_id: current.id })

    if (existingDeal) {
      return {
        status: 400,
        message: 'An deal with this external_id already exists'
      }
    }

    if (current.status !== EDealStatus.WON) {
      return {
        status: 200,
        message: 'Updated deal still not won'
      }
    }

    const deal: IMDeal = await DealModel.create({
      title: current.title,
      value: current.value,
      currency: current.currency,
      org_name: current.org_name,
      won_time: current.won_time,
      external_id: current.id
    })

    return {
      status: 201,
      message: 'Deal created successfully',
      body: deal
    }
  }

  public async delete (request: Request): Promise<IHttpResponse> {
    await DealModel.deleteMany({})
    return {
      status: 200,
      message: 'All deals deleted successfully'
    }
  }
}

export default new DealController()
