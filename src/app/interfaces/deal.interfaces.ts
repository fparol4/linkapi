import { Document } from 'mongoose'

export interface IDeal {
  title: string
  value: number
  currency: string
  won_time: Date
  org_name: string
  external_id: number
}

export interface IMDeal extends IDeal, Document {}
