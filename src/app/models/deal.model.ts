import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { IMDeal } from '../interfaces/deal.interfaces'

const DealSchema: Schema = new Schema({
  title: { type: String, required: true },
  value: { type: Number, required: true, min: [0, 'The value cannot be lower than 0'] },
  currency: { type: String, required: true },
  org_name: { type: String, required: true },
  external_id: { type: String, required: true },
  won_time: { type: Date }
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

DealSchema.plugin(mongoosePaginate)
export const DealModel = mongoose.model<IMDeal>('Deal', DealSchema)
