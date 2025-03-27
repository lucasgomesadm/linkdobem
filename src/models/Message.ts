import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;
  recipient: mongoose.Types.ObjectId;
  opportunity?: mongoose.Types.ObjectId;
  content: string;
  read: boolean;
  attachments?: {
    url: string;
    type: string;
    name: string;
  }[];
  replyTo?: mongoose.Types.ObjectId;
}

const messageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  opportunity: { type: Schema.Types.ObjectId, ref: 'Opportunity' },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
  attachments: [{
    url: { type: String },
    type: { type: String },
    name: { type: String }
  }],
  replyTo: { type: Schema.Types.ObjectId, ref: 'Message' }
}, {
  timestamps: true
});

// Índices para otimizar consultas de mensagens
messageSchema.index({ sender: 1, recipient: 1 });
messageSchema.index({ opportunity: 1 });
messageSchema.index({ read: 1 });

export const Message = mongoose.model<IMessage>('Message', messageSchema); 