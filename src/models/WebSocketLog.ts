import mongoose, { Document, Schema } from 'mongoose';

export interface IWebSocketLog extends Document {
  event: string;
  type: 'connection' | 'message' | 'disconnection' | 'error';
  client: {
    id: string;
    ip: string;
    userAgent: string;
    user?: mongoose.Types.ObjectId;
  };
  data?: any;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  metadata?: {
    [key: string]: any;
  };
}

const webSocketLogSchema = new Schema<IWebSocketLog>({
  event: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['connection', 'message', 'disconnection', 'error'],
    required: true 
  },
  client: {
    id: { type: String, required: true },
    ip: { type: String, required: true },
    userAgent: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  data: { type: Schema.Types.Mixed },
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
webSocketLogSchema.index({ 'client.id': 1 });
webSocketLogSchema.index({ type: 1 });
webSocketLogSchema.index({ event: 1 });
webSocketLogSchema.index({ createdAt: -1 });

export const WebSocketLog = mongoose.model<IWebSocketLog>('WebSocketLog', webSocketLogSchema); 