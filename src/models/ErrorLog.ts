import mongoose, { Document, Schema } from 'mongoose';

export interface IErrorLog extends Document {
  error: {
    name: string;
    message: string;
    stack?: string;
    code?: string;
  };
  context: {
    user?: mongoose.Types.ObjectId;
    endpoint?: string;
    method?: string;
    query?: {
      [key: string]: any;
    };
    body?: {
      [key: string]: any;
    };
  };
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'investigating' | 'resolved' | 'ignored';
  assignedTo?: mongoose.Types.ObjectId;
  resolution?: {
    date: Date;
    by: mongoose.Types.ObjectId;
    description: string;
  };
  metadata?: {
    [key: string]: any;
  };
}

const errorLogSchema = new Schema<IErrorLog>({
  error: {
    name: { type: String, required: true },
    message: { type: String, required: true },
    stack: { type: String },
    code: { type: String }
  },
  context: {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    endpoint: { type: String },
    method: { type: String },
    query: { type: Map, of: Schema.Types.Mixed },
    body: { type: Map, of: Schema.Types.Mixed }
  },
  severity: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'critical'],
    required: true 
  },
  status: { 
    type: String, 
    enum: ['new', 'investigating', 'resolved', 'ignored'],
    default: 'new'
  },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  resolution: {
    date: { type: Date },
    by: { type: Schema.Types.ObjectId, ref: 'User' },
    description: { type: String }
  },
  metadata: { type: Map, of: Schema.Types.Mixed }
}, {
  timestamps: true
});

// Índices para otimizar consultas
errorLogSchema.index({ 'error.name': 1 });
errorLogSchema.index({ severity: 1 });
errorLogSchema.index({ status: 1 });
errorLogSchema.index({ assignedTo: 1 });
errorLogSchema.index({ createdAt: -1 });

export const ErrorLog = mongoose.model<IErrorLog>('ErrorLog', errorLogSchema); 