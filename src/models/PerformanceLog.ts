import mongoose, { Document, Schema } from 'mongoose';

export interface IPerformanceLog extends Document {
  endpoint: string;
  method: string;
  responseTime: number;
  status: number;
  timestamp: Date;
  metrics: {
    cpu?: {
      usage: number;
      cores: number;
    };
    memory?: {
      used: number;
      total: number;
    };
    database?: {
      queries: number;
      time: number;
    };
    cache?: {
      hits: number;
      misses: number;
      time: number;
    };
    external?: {
      calls: number;
      time: number;
    };
  };
  metadata?: {
    [key: string]: any;
  };
}

const performanceLogSchema = new Schema<IPerformanceLog>({
  endpoint: { type: String, required: true },
  method: { type: String, required: true },
  responseTime: { type: Number, required: true },
  status: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  metrics: {
    cpu: {
      usage: { type: Number },
      cores: { type: Number }
    },
    memory: {
      used: { type: Number },
      total: { type: Number }
    },
    database: {
      queries: { type: Number },
      time: { type: Number }
    },
    cache: {
      hits: { type: Number },
      misses: { type: Number },
      time: { type: Number }
    },
    external: {
      calls: { type: Number },
      time: { type: Number }
    }
  },
  metadata: { type: Map, of: Schema.Types.Mixed }
}, {
  timestamps: true
});

// Índices para otimizar consultas
performanceLogSchema.index({ endpoint: 1, method: 1 });
performanceLogSchema.index({ timestamp: -1 });
performanceLogSchema.index({ responseTime: 1 });
performanceLogSchema.index({ status: 1 });

export const PerformanceLog = mongoose.model<IPerformanceLog>('PerformanceLog', performanceLogSchema); 