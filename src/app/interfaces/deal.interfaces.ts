import { Document } from 'mongoose'

export interface IDeal {
  title: string
  value: number
  currency: string
  won_time: Date
  org_name: string
  external_id: number
  created_at: Date
  updated_at: Date
}

export interface IMDeal extends IDeal, Document {}
