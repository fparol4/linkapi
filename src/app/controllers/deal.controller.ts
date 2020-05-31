import { IHttpResponse } from '../interfaces/http.interfaces'
import { Request } from 'express'
import { IPipedriveDeal, EDealStatus } from '../interfaces/pipedrive.interfaces'
import { IMDeal } from '../interfaces/deal.interfaces'
import { DealModel } from '../models/deal.model'
import { PaginateResult } from 'mongoose'
import { blingService } from '../services/bling.service'

class DealController {
  public async index (request: Request): Promise<IHttpResponse> {
    const { query: { limit, page, title, value } } = request

    const deals: PaginateResult<IMDeal> = await DealModel
      .paginate(
        {
          title: new RegExp(String(title), 'i'),
          value: { $gt: value }
        },
        { page: Number(page), limit: Number(limit) })

    return {
      status: 200,
      message: 'All deals found successfully',
      body: deals
    }
  }

  public async store (request: Request): Promise<IHttpResponse> {
    const { body: { current } }: { body: { current: IPipedriveDeal } } = request

    if (current.status !== EDealStatus.WON) {
      return {
        status: 200,
        message: 'Updated deal still not won'
      }
    }

    const existingDeal = await DealModel.findOne({ external_id: current.id })

    if (existingDeal) {
      return {
        status: 400,
        message: 'An deal with this external_id already exists'
      }
    }

    await blingService.sendDeal({
      cliente: {
        nome: current.org_name
      },
      item: {
        codigo: current.id,
        descricao: current.title,
        vlr_unit: current.value,
        currency: current.currency
      }
    })

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
