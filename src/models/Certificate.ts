import mongoose, { Document, Schema } from 'mongoose';

export interface ICertificate extends Document {
  volunteer: mongoose.Types.ObjectId;
  opportunity: mongoose.Types.ObjectId;
  organization: mongoose.Types.ObjectId;
  issueDate: Date;
  hours: number;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  certificateUrl?: string;
  validUntil?: Date;
}

const certificateSchema = new Schema<ICertificate>({
  volunteer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  opportunity: { type: Schema.Types.ObjectId, ref: 'Opportunity', required: true },
  organization: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  issueDate: { type: Date, default: Date.now },
  hours: { type: Number, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  certificateUrl: { type: String },
  validUntil: { type: Date }
}, {
  timestamps: true
});

export const Certificate = mongoose.model<ICertificate>('Certificate', certificateSchema); 