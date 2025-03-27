import mongoose, { Document, Schema } from 'mongoose';

export interface IAccessLog extends Document {
  user?: mongoose.Types.ObjectId;
  action: string;
  method: string;
  path: string;
  query?: {
    [key: string]: any;
  };
  body?: {
    [key: string]: any;
  };
  ipAddress: string;
  userAgent: string;
  status: number;
  responseTime: number;
  error?: {
    message: string;
    stack?: string;
  };
  metadata?: {
    [key: string]: any;
  };
}

const accessLogSchema = new Schema<IAccessLog>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  method: { type: String, required: true },
  path: { type: String, required: true },
  query: { type: Map, of: Schema.Types.Mixed },
  body: { type: Map, of: Schema.Types.Mixed },
  ipAddress: { type: String, required: true },
  userAgent: { type: String, required: true },
  status: { type: Number, required: true },
  responseTime: { type: Number, required: true },
  error: {
    message: { type: String },
    stack: { type: String }
  },
  metadata: { type: Map, of: Schema.Types.Mixed }
}, {
  timestamps: true
});

// Índices para otimizar consultas
accessLogSchema.index({ user: 1, createdAt: -1 });
accessLogSchema.index({ path: 1, method: 1 });
accessLogSchema.index({ status: 1 });
accessLogSchema.index({ ipAddress: 1 });
accessLogSchema.index({ createdAt: -1 });

export const AccessLog = mongoose.model<IAccessLog>('AccessLog', accessLogSchema); 