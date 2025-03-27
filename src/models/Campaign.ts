import mongoose, { Document, Schema } from 'mongoose';

export interface ICampaign extends Document {
  title: string;
  description: string;
  organization: mongoose.Types.ObjectId;
  goal: number;
  currentAmount: number;
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  category: string;
  images: {
    url: string;
    type: 'main' | 'gallery';
    caption?: string;
  }[];
  updates: {
    date: Date;
    content: string;
    images?: string[];
  }[];
  donors: {
    user: mongoose.Types.ObjectId;
    amount: number;
    date: Date;
    anonymous: boolean;
    message?: string;
  }[];
  rewards?: {
    title: string;
    description: string;
    amount: number;
    available: number;
    claimed: number;
  }[];
  tags: string[];
  visibility: 'public' | 'private';
}

const campaignSchema = new Schema<ICampaign>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  organization: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  goal: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['draft', 'active', 'completed', 'cancelled'],
    default: 'draft'
  },
  category: { type: String, required: true },
  images: [{
    url: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['main', 'gallery'],
      default: 'gallery'
    },
    caption: { type: String }
  }],
  updates: [{
    date: { type: Date, default: Date.now },
    content: { type: String, required: true },
    images: [{ type: String }]
  }],
  donors: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    anonymous: { type: Boolean, default: false },
    message: { type: String }
  }],
  rewards: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    available: { type: Number, required: true },
    claimed: { type: Number, default: 0 }
  }],
  tags: [{ type: String }],
  visibility: { 
    type: String, 
    enum: ['public', 'private'],
    default: 'public'
  }
}, {
  timestamps: true
});

// Índices para otimizar consultas
campaignSchema.index({ organization: 1, status: 1 });
campaignSchema.index({ startDate: 1, endDate: 1 });
campaignSchema.index({ category: 1 });
campaignSchema.index({ tags: 1 });

export const Campaign = mongoose.model<ICampaign>('Campaign', campaignSchema); 