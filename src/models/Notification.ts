import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId;
  type: 'opportunity' | 'certificate' | 'review' | 'training' | 'system';
  title: string;
  message: string;
  relatedEntity?: {
    type: string;
    id: mongoose.Types.ObjectId;
  };
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  expiresAt?: Date;
}

const notificationSchema = new Schema<INotification>({
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['opportunity', 'certificate', 'review', 'training', 'system'],
    required: true 
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  relatedEntity: {
    type: { type: String },
    id: { type: Schema.Types.ObjectId }
  },
  read: { type: Boolean, default: false },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  expiresAt: { type: Date }
}, {
  timestamps: true
});

// Índice para otimizar consultas de notificações não lidas
notificationSchema.index({ recipient: 1, read: 1 });

export const Notification = mongoose.model<INotification>('Notification', notificationSchema); 