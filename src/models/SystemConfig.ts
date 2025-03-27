import mongoose, { Document, Schema } from 'mongoose';

export interface ISystemConfig extends Document {
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description: string;
  category: string;
  isPublic: boolean;
  lastModifiedBy: mongoose.Types.ObjectId;
  history: {
    value: any;
    modifiedBy: mongoose.Types.ObjectId;
    modifiedAt: Date;
    reason?: string;
  }[];
}

const systemConfigSchema = new Schema<ISystemConfig>({
  key: { 
    type: String, 
    required: true, 
    unique: true 
  },
  value: { type: Schema.Types.Mixed, required: true },
  type: { 
    type: String, 
    enum: ['string', 'number', 'boolean', 'object', 'array'],
    required: true 
  },
  description: { type: String, required: true },
  category: { type: String, required: true },
  isPublic: { type: Boolean, default: false },
  lastModifiedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  history: [{
    value: { type: Schema.Types.Mixed, required: true },
    modifiedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    modifiedAt: { type: Date, default: Date.now },
    reason: { type: String }
  }]
}, {
  timestamps: true
});

// Índices para otimizar consultas
systemConfigSchema.index({ category: 1 });
systemConfigSchema.index({ isPublic: 1 });

export const SystemConfig = mongoose.model<ISystemConfig>('SystemConfig', systemConfigSchema); 