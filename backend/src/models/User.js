import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  idNumber:  { type: String, default: '' },
  role:      { type: String, enum: ['admin', 'developer','tester','technician'], default: 'technician' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);
