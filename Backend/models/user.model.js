import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    recordings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: `Recording`,
      unique: true, // Ensure each recording is unique to the user
    }],
    avatar: {
      type: String, // URL to avatar image (optional)
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);
