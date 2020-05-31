import { BlingConfiguration } from '../../configurations/bling.configurations'
import { IBlingDeal } from '../interfaces/bling.interfaces'
import { JsXmlHelper } from '../helpers/js-xml.helper'
import { AxiosFactory } from '../factories/axios.factory'
import { AxiosInstance } from 'axios'
import { AppError } from '../abstracts/app-error.abstract'

export class BlingService {
  private readonly apiKey: string
  private readonly baseUrl: string
  private readonly axios: AxiosInstance

  constructor () {
    this.apiKey = BlingConfiguration.apiKey
    this.baseUrl = BlingConfiguration.baseUrl
    this.axios = AxiosFactory.make(this.baseUrl)
  }

  public async sendDeal (deal: IBlingDeal): Promise<void> {
    const { cliente, item } = deal

    const dealBling = {
      pedido: {
        cliente,
        itens: {
          item: {
            ...item,
            qtde: 1
          }
        }
      }
    }

    const xml = JsXmlHelper.object2Xml(dealBling)

    const { data: { retorno } } = await this
      .axios
      .post('/pedido/json', {}, {
        params: {
          apikey: this.apiKey,
          xml: xml
        }
      })

    if (retorno.erros) {
      throw new AppError('An error occurred trying to integrate with bling')
    }
  }
}

export const blingService = new BlingService()
