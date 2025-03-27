import mongoose, { Document, Schema } from 'mongoose';

export interface IQueueLog extends Document {
  queue: string;
  jobId: string;
  action: 'enqueue' | 'start' | 'complete' | 'fail' | 'retry';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'retrying';
  data?: any;
  result?: any;
  error?: {
    message: string;
    stack?: string;
    code?: string;
  };
  attempts: number;
  duration?: number;
  priority?: number;
  metadata?: {
    [key: string]: any;
  };
}

const queueLogSchema = new Schema<IQueueLog>({
  queue: { type: String, required: true },
  jobId: { type: String, required: true },
  action: { 
    type: String, 
    enum: ['enqueue', 'start', 'complete', 'fail', 'retry'],
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'failed', 'retrying'],
    required: true 
  },
  data: { type: Schema.Types.Mixed },
  result: { type: Schema.Types.Mixed },
  error: {
    message: { type: String },
    stack: { type: String },
    code: { type: String }
  },
  attempts: { type: Number, default: 0 },
  duration: { type: Number },
  priority: { type: Number },
  metadata: { type: Map, of: Schema.Types.Mixed }
}, {
  timestamps: true
});

// Índices para otimizar consultas
queueLogSchema.index({ queue: 1, jobId: 1 });
queueLogSchema.index({ status: 1 });
queueLogSchema.index({ action: 1 });
queueLogSchema.index({ createdAt: -1 });

export const QueueLog = mongoose.model<IQueueLog>('QueueLog', queueLogSchema); 