import { IHttpResponse } from '../interfaces/http.interfaces'
import { Request } from 'express'
import { IPipedriveDeal } from '../interfaces/pipedrive.interfaces'
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
    const { body }: { body: IPipedriveDeal } = request

    const deal: IMDeal = await DealModel.create({
      value: body.value,
      currency: body.currency,
      org: {
        name: body.org_id.name,
        address: body.org_id.address,
        cc_email: body.org_id.cc_email
      },
      title: body.title,
      won_time: body.won_time
    })

    return {
      status: 201,
      message: 'Deal created successfully',
      body: deal
    }
  }
}

export default new DealController()
