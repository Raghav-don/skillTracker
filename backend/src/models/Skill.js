import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:       { type: String, required: true },
  description: { type: String },
  progress:    { type: Number, min: 0, max: 100 },

  progressHistory: [
    {
      value: { type: Number },
      date:  { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
