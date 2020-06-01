import { IHttpResponse } from '../interfaces/http.interfaces'
import { Request } from 'express'
import { IPipedriveDeal, EDealStatus } from '../interfaces/pipedrive.interfaces'
import { IMDeal } from '../interfaces/deal.interfaces'
import { DealModel } from '../models/deal.model'
import { PaginateResult } from 'mongoose'
import { blingService } from '../services/bling.service'

class DealController {
  public async index (request: Request): Promise<IHttpResponse> {
    const { query: { limit, page, title, min_value } } = request

    const deals: PaginateResult<IMDeal> = await DealModel
      .paginate({
        title: new RegExp(String(title), 'i'),
        value: { $gte: min_value }
      }, { page: Number(page), limit: Number(limit) })

    return {
      status: 200,
      message: 'All deals found successfully',
      body: deals
    }
  }

  public async show (request: Request): Promise<IHttpResponse> {
    const { params: { id } } = request

    const deal: IMDeal = await DealModel.findOne({ _id: id })

    return {
      status: 200,
      message: 'Deal found successfully',
      body: deal
    }
  }

  public async aggregated (request: Request): Promise<IHttpResponse> {
    const { query: { min_total, min_date } } = request

    const deals: IMDeal[] = await DealModel.aggregate(
      [
        {
          $match: {
            won_time: { $gte: new Date(String(min_date)) }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$won_time' } },
            total: { $sum: '$value' }
          }
        },
        {
          $match: {
            total: { $gte: min_total }
          }
        }
      ]
    )

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

    const existingDeal = await DealModel.countDocuments({ external_id: current.id })

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
}

export default new DealController()
