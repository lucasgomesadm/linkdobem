import mongoose, { Document, Schema } from 'mongoose';

export interface IIntegrationLog extends Document {
  integration: string;
  action: string;
  direction: 'inbound' | 'outbound';
  status: 'success' | 'error' | 'pending';
  request: {
    method?: string;
    url?: string;
    headers?: {
      [key: string]: string;
    };
    body?: any;
  };
  response?: {
    status: number;
    headers?: {
      [key: string]: string;
    };
    body?: any;
  };
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  duration: number;
  metadata?: {
    [key: string]: any;
  };
}

const integrationLogSchema = new Schema<IIntegrationLog>({
  integration: { type: String, required: true },
  action: { type: String, required: true },
  direction: { 
    type: String, 
    enum: ['inbound', 'outbound'],
    required: true 
  },
  status: { 
    type: String, 
    enum: ['success', 'error', 'pending'],
    required: true 
  },
  request: {
    method: { type: String },
    url: { type: String },
    headers: { type: Map, of: String },
    body: { type: Schema.Types.Mixed }
  },
  response: {
    status: { type: Number },
    headers: { type: Map, of: String },
    body: { type: Schema.Types.Mixed }
  },
  error: {
    message: { type: String },
    code: { type: String },
    details: { type: Schema.Types.Mixed }
  },
  duration: { type: Number, required: true },
  metadata: { type: Map, of: Schema.Types.Mixed }
}, {
  timestamps: true
});

// Índices para otimizar consultas
integrationLogSchema.index({ integration: 1, createdAt: -1 });
integrationLogSchema.index({ direction: 1, status: 1 });
integrationLogSchema.index({ 'request.url': 1 });
integrationLogSchema.index({ duration: 1 });
integrationLogSchema.index({ createdAt: -1 });

export const IntegrationLog = mongoose.model<IIntegrationLog>('IntegrationLog', integrationLogSchema); 