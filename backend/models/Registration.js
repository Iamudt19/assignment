const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
  {
    competitionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Competition',
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'success',
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Compound index to ensure a user cannot register twice for the same competition
registrationSchema.index({ competitionId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
