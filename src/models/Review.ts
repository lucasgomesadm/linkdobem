import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  reviewer: mongoose.Types.ObjectId;
  reviewed: mongoose.Types.ObjectId;
  opportunity: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  type: 'volunteer-to-org' | 'org-to-volunteer';
  status: 'pending' | 'approved' | 'rejected';
}

const reviewSchema = new Schema<IReview>({
  reviewer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reviewed: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  opportunity: { type: Schema.Types.ObjectId, ref: 'Opportunity', required: true },
  rating: { 
    type: Number, 
    required: true,
    min: 1,
    max: 5
  },
  comment: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['volunteer-to-org', 'org-to-volunteer'],
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Índice composto para garantir uma única avaliação por par reviewer-reviewed-opportunity
reviewSchema.index({ reviewer: 1, reviewed: 1, opportunity: 1 }, { unique: true });

export const Review = mongoose.model<IReview>('Review', reviewSchema); 