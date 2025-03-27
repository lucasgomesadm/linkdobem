import mongoose, { Document, Schema } from 'mongoose';

export interface ISubscription extends Document {
  organization: mongoose.Types.ObjectId;
  plan: 'free' | 'basic' | 'pro' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  startDate: Date;
  endDate: Date;
  paymentMethod: {
    type: string;
    details: {
      [key: string]: any;
    };
  };
  billing: {
    amount: number;
    currency: string;
    frequency: 'monthly' | 'yearly';
    nextBillingDate: Date;
  };
  features: {
    name: string;
    enabled: boolean;
    limit?: number;
    usage?: number;
  }[];
  history: {
    date: Date;
    action: string;
    details: string;
  }[];
}

const subscriptionSchema = new Schema<ISubscription>({
  organization: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { 
    type: String, 
    enum: ['free', 'basic', 'pro', 'enterprise'],
    default: 'free'
  },
  status: { 
    type: String, 
    enum: ['active', 'cancelled', 'expired', 'pending'],
    default: 'pending'
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  paymentMethod: {
    type: { type: String, required: true },
    details: { type: Map, of: Schema.Types.Mixed }
  },
  billing: {
    amount: { type: Number, required: true },
    currency: { type: String, default: 'BRL' },
    frequency: { 
      type: String, 
      enum: ['monthly', 'yearly'],
      required: true 
    },
    nextBillingDate: { type: Date, required: true }
  },
  features: [{
    name: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    limit: { type: Number },
    usage: { type: Number, default: 0 }
  }],
  history: [{
    date: { type: Date, default: Date.now },
    action: { type: String, required: true },
    details: { type: String }
  }]
}, {
  timestamps: true
});

// Índices para otimizar consultas
subscriptionSchema.index({ organization: 1, status: 1 });
subscriptionSchema.index({ endDate: 1 });
subscriptionSchema.index({ 'billing.nextBillingDate': 1 });

export const Subscription = mongoose.model<ISubscription>('Subscription', subscriptionSchema); 