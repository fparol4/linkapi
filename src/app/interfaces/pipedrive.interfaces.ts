export enum EDealStatus {
  LOST = 'lost',
  WON = 'won',
  OPEN = 'open'
}

export interface IPipedriveDeal {
  id: number
  title: string
  value: number
  currency: string
  won_time: Date
  org_name: string
  status: string
}
