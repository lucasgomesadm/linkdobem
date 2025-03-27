import mongoose, { Document, Schema } from 'mongoose';

export interface IPartnership extends Document {
  name: string;
  type: 'company' | 'university';
  description: string;
  contact: {
    name: string;
    email: string;
    phone?: string;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  website?: string;
  logo?: string;
  status: 'pending' | 'active' | 'inactive' | 'rejected';
  benefits: string[];
  requirements?: string[];
  opportunities: mongoose.Types.ObjectId[];
  volunteers: {
    user: mongoose.Types.ObjectId;
    role: string;
    startDate: Date;
    endDate?: Date;
  }[];
  documents?: {
    name: string;
    url: string;
    type: string;
  }[];
}

const partnershipSchema = new Schema<IPartnership>({
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['company', 'university'],
    required: true 
  },
  description: { type: String, required: true },
  contact: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }
  },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipCode: { type: String }
  },
  website: { type: String },
  logo: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'active', 'inactive', 'rejected'],
    default: 'pending'
  },
  benefits: [{ type: String }],
  requirements: [{ type: String }],
  opportunities: [{ type: Schema.Types.ObjectId, ref: 'Opportunity' }],
  volunteers: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    role: { type: String },
    startDate: { type: Date },
    endDate: { type: Date }
  }],
  documents: [{
    name: { type: String },
    url: { type: String },
    type: { type: String }
  }]
}, {
  timestamps: true
});

// Índices para otimizar consultas
partnershipSchema.index({ type: 1, status: 1 });
partnershipSchema.index({ 'contact.email': 1 });

export const Partnership = mongoose.model<IPartnership>('Partnership', partnershipSchema); 