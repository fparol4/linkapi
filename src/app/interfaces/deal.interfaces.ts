import { Document } from 'mongoose'

interface IOrg {
  name: string
  address: string
  cc_email: string
}

export interface IDeal {
  title: string
  value: number
  currency: string
  won_time: Date
  org: IOrg
}

export interface IMDeal extends IDeal, Document {}
