import mongoose, { Document, Schema } from 'mongoose';

export interface ITraining extends Document {
  title: string;
  description: string;
  category: string;
  type: 'course' | 'video' | 'document' | 'quiz';
  content: {
    url: string;
    duration?: string;
    format?: string;
  };
  instructor?: mongoose.Types.ObjectId;
  level: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[];
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  enrolledStudents: mongoose.Types.ObjectId[];
  completionCertificates: {
    student: mongoose.Types.ObjectId;
    completionDate: Date;
    score?: number;
  }[];
}

const trainingSchema = new Schema<ITraining>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['course', 'video', 'document', 'quiz'],
    required: true 
  },
  content: {
    url: { type: String, required: true },
    duration: { type: String },
    format: { type: String }
  },
  instructor: { type: Schema.Types.ObjectId, ref: 'User' },
  level: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true 
  },
  prerequisites: [{ type: String }],
  tags: [{ type: String }],
  status: { 
    type: String, 
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  enrolledStudents: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  completionCertificates: [{
    student: { type: Schema.Types.ObjectId, ref: 'User' },
    completionDate: { type: Date, default: Date.now },
    score: { type: Number }
  }]
}, {
  timestamps: true
});

export const Training = mongoose.model<ITraining>('Training', trainingSchema); 