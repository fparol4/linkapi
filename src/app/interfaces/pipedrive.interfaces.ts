interface IPipedriveOrg {
  name: string
  address: string
  cc_email: string
}

export interface IPipedriveDeal {
  id: number
  title: string
  value: number
  currency: string
  won_time: Date
  org_id: IPipedriveOrg
}
