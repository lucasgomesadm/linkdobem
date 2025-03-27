import mongoose, { Document, Schema } from 'mongoose';

export interface IOpportunity extends Document {
  title: string;
  description: string;
  organization: mongoose.Types.ObjectId;
  category: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  type: 'in-person' | 'remote' | 'hybrid';
  requirements: string[];
  schedule: {
    startDate: Date;
    endDate?: Date;
    frequency?: string;
    duration?: string;
  };
  spots: number;
  registeredVolunteers: mongoose.Types.ObjectId[];
  status: 'open' | 'closed' | 'cancelled';
  skills: string[];
  benefits: string[];
}

const opportunitySchema = new Schema<IOpportunity>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  organization: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number }
    }
  },
  type: { 
    type: String, 
    enum: ['in-person', 'remote', 'hybrid'],
    required: true 
  },
  requirements: [{ type: String }],
  schedule: {
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    frequency: { type: String },
    duration: { type: String }
  },
  spots: { type: Number, required: true },
  registeredVolunteers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  status: { 
    type: String, 
    enum: ['open', 'closed', 'cancelled'],
    default: 'open'
  },
  skills: [{ type: String }],
  benefits: [{ type: String }]
}, {
  timestamps: true
});

export const Opportunity = mongoose.model<IOpportunity>('Opportunity', opportunitySchema); 