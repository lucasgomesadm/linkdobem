import mongoose, { Document, Schema } from 'mongoose';

export interface ISecurityLog extends Document {
  user?: mongoose.Types.ObjectId;
  event: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  ipAddress: string;
  userAgent: string;
  location?: {
    country?: string;
    city?: string;
    region?: string;
    latitude?: number;
    longitude?: number;
  };
  details: {
    [key: string]: any;
  };
  status: 'success' | 'failure' | 'warning';
  metadata?: {
    [key: string]: any;
  };
}

const securityLogSchema = new Schema<ISecurityLog>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  event: { type: String, required: true },
  severity: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'critical'],
    required: true 
  },
  description: { type: String, required: true },
  ipAddress: { type: String, required: true },
  userAgent: { type: String, required: true },
  location: {
    country: { type: String },
    city: { type: String },
    region: { type: String },
    latitude: { type: Number },
    longitude: { type: Number }
  },
  details: { type: Map, of: Schema.Types.Mixed },
  status: { 
    type: String, 
    enum: ['success', 'failure', 'warning'],
    required: true 
  },
  metadata: { type: Map, of: Schema.Types.Mixed }
}, {
  timestamps: true
});

// Índices para otimizar consultas
securityLogSchema.index({ user: 1, createdAt: -1 });
securityLogSchema.index({ event: 1, severity: 1 });
securityLogSchema.index({ ipAddress: 1 });
securityLogSchema.index({ status: 1 });
securityLogSchema.index({ createdAt: -1 });

export const SecurityLog = mongoose.model<ISecurityLog>('SecurityLog', securityLogSchema); 