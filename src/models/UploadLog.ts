import mongoose, { Document, Schema } from 'mongoose';

export interface IUploadLog extends Document {
  user: mongoose.Types.ObjectId;
  file: {
    name: string;
    type: string;
    size: number;
    mimeType: string;
    extension: string;
  };
  status: 'pending' | 'processing' | 'completed' | 'failed';
  storage: {
    provider: string;
    path: string;
    url?: string;
  };
  processing?: {
    duration: number;
    result?: any;
    error?: {
      message: string;
      code?: string;
      details?: any;
    };
  };
  metadata?: {
    [key: string]: any;
  };
}

const uploadLogSchema = new Schema<IUploadLog>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  file: {
    name: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: Number, required: true },
    mimeType: { type: String, required: true },
    extension: { type: String, required: true }
  },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  storage: {
    provider: { type: String, required: true },
    path: { type: String, required: true },
    url: { type: String }
  },
  processing: {
    duration: { type: Number },
    result: { type: Schema.Types.Mixed },
    error: {
      message: { type: String },
      code: { type: String },
      details: { type: Schema.Types.Mixed }
    }
  },
  metadata: { type: Map, of: Schema.Types.Mixed }
}, {
  timestamps: true
});

// Índices para otimizar consultas
uploadLogSchema.index({ user: 1, createdAt: -1 });
uploadLogSchema.index({ status: 1 });
uploadLogSchema.index({ 'file.type': 1 });
uploadLogSchema.index({ createdAt: -1 });

export const UploadLog = mongoose.model<IUploadLog>('UploadLog', uploadLogSchema); 