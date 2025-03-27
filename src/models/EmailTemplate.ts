import mongoose, { Document, Schema } from 'mongoose';

export interface IEmailTemplate extends Document {
  name: string;
  subject: string;
  body: string;
  variables: string[];
  category: string;
  language: string;
  isActive: boolean;
  lastModifiedBy: mongoose.Types.ObjectId;
  history: {
    subject: string;
    body: string;
    variables: string[];
    modifiedBy: mongoose.Types.ObjectId;
    modifiedAt: Date;
    reason?: string;
  }[];
}

const emailTemplateSchema = new Schema<IEmailTemplate>({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  variables: [{ type: String }],
  category: { type: String, required: true },
  language: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  lastModifiedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  history: [{
    subject: { type: String, required: true },
    body: { type: String, required: true },
    variables: [{ type: String }],
    modifiedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    modifiedAt: { type: Date, default: Date.now },
    reason: { type: String }
  }]
}, {
  timestamps: true
});

// Índices para otimizar consultas
emailTemplateSchema.index({ category: 1, language: 1 });
emailTemplateSchema.index({ isActive: 1 });
emailTemplateSchema.index({ name: 1 });

export const EmailTemplate = mongoose.model<IEmailTemplate>('EmailTemplate', emailTemplateSchema); 