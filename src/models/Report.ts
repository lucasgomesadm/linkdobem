import mongoose, { Document, Schema } from 'mongoose';

export interface IReport extends Document {
  organization: mongoose.Types.ObjectId;
  period: {
    start: Date;
    end: Date;
  };
  metrics: {
    totalOpportunities: number;
    activeOpportunities: number;
    totalVolunteers: number;
    newVolunteers: number;
    totalHours: number;
    averageRating: number;
    categories: {
      [key: string]: number;
    };
    impact: {
      beneficiaries: number;
      description: string;
    };
  };
  status: 'draft' | 'published' | 'archived';
  notes?: string;
  attachments?: {
    url: string;
    type: string;
    name: string;
  }[];
}

const reportSchema = new Schema<IReport>({
  organization: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  period: {
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  },
  metrics: {
    totalOpportunities: { type: Number, default: 0 },
    activeOpportunities: { type: Number, default: 0 },
    totalVolunteers: { type: Number, default: 0 },
    newVolunteers: { type: Number, default: 0 },
    totalHours: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    categories: { type: Map, of: Number },
    impact: {
      beneficiaries: { type: Number, default: 0 },
      description: { type: String }
    }
  },
  status: { 
    type: String, 
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  notes: { type: String },
  attachments: [{
    url: { type: String },
    type: { type: String },
    name: { type: String }
  }]
}, {
  timestamps: true
});

// Índice para otimizar consultas de relatórios por organização e período
reportSchema.index({ organization: 1, 'period.start': -1 });

export const Report = mongoose.model<IReport>('Report', reportSchema); 