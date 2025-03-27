import mongoose, { Document, Schema } from 'mongoose';

export interface IEmailLog extends Document {
  template: mongoose.Types.ObjectId;
  recipient: {
    email: string;
    name?: string;
  };
  subject: string;
  body: string;
  variables: {
    [key: string]: any;
  };
  status: 'pending' | 'sent' | 'failed';
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  metadata: {
    ipAddress?: string;
    userAgent?: string;
    trackingId?: string;
    [key: string]: any;
  };
}

const emailLogSchema = new Schema<IEmailLog>({
  template: { type: Schema.Types.ObjectId, ref: 'EmailTemplate', required: true },
  recipient: {
    email: { type: String, required: true },
    name: { type: String }
  },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  variables: { type: Map, of: Schema.Types.Mixed },
  status: { 
    type: String, 
    enum: ['pending', 'sent', 'failed'],
    default: 'pending'
  },
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
emailLogSchema.index({ template: 1, createdAt: -1 });
emailLogSchema.index({ 'recipient.email': 1 });
emailLogSchema.index({ status: 1 });
emailLogSchema.index({ createdAt: -1 });

export const EmailLog = mongoose.model<IEmailLog>('EmailLog', emailLogSchema); 