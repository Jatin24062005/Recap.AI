import mongoose from 'mongoose';

const recordingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    meetUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    transcript: {
      type: String, // optional: store full transcription
    },
    duration: {
      type: Number, // in seconds
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Recording = mongoose.model('Recording', recordingSchema);
