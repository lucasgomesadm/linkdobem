import mongoose, { Document, Schema } from 'mongoose';

export interface IActivityLog extends Document {
  user?: mongoose.Types.ObjectId;
  action: string;
  entityType: string;
  entityId?: mongoose.Types.ObjectId;
  details: {
    [key: string]: any;
  };
  ipAddress?: string;
  userAgent?: string;
  status: 'success' | 'error' | 'warning';
  error?: {
    message: string;
    stack?: string;
  };
  metadata?: {
    [key: string]: any;
  };
}

const activityLogSchema = new Schema<IActivityLog>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  entityType: { type: String, required: true },
  entityId: { type: Schema.Types.ObjectId },
  details: { type: Map, of: Schema.Types.Mixed },
  ipAddress: { type: String },
  userAgent: { type: String },
  status: { 
    type: String, 
    enum: ['success', 'error', 'warning'],
    default: 'success'
  },
  error: {
    message: { type: String },
    stack: { type: String }
  },
  metadata: { type: Map, of: Schema.Types.Mixed }
}, {
  timestamps: true
});

// Índices para otimizar consultas
activityLogSchema.index({ user: 1, createdAt: -1 });
activityLogSchema.index({ action: 1, entityType: 1 });
activityLogSchema.index({ status: 1 });
activityLogSchema.index({ createdAt: -1 });

export const ActivityLog = mongoose.model<IActivityLog>('ActivityLog', activityLogSchema); 