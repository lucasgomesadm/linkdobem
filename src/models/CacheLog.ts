import mongoose, { Document, Schema } from 'mongoose';

export interface ICacheLog extends Document {
  key: string;
  operation: 'get' | 'set' | 'delete' | 'clear';
  status: 'hit' | 'miss' | 'error';
  duration: number;
  size?: number;
  ttl?: number;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  metadata?: {
    [key: string]: any;
  };
}

const cacheLogSchema = new Schema<ICacheLog>({
  key: { type: String, required: true },
  operation: { 
    type: String, 
    enum: ['get', 'set', 'delete', 'clear'],
    required: true 
  },
  status: { 
    type: String, 
    enum: ['hit', 'miss', 'error'],
    required: true 
  },
  duration: { type: Number, required: true },
  size: { type: Number },
  ttl: { type: Number },
  error: {
    message: { type: String },
    code: { type: String },
    details: { type: Schema.Types.Mixed }
  },
  metadata: { type: Map, of: Schema.Types.Mixed }
}, {
  timestamps: true
});

// Índices para otimizar consultas
cacheLogSchema.index({ key: 1 });
cacheLogSchema.index({ operation: 1, status: 1 });
cacheLogSchema.index({ duration: 1 });
cacheLogSchema.index({ createdAt: -1 });

export const CacheLog = mongoose.model<ICacheLog>('CacheLog', cacheLogSchema); 