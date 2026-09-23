const mongoose = require('mongoose');

const judgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  experience: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  videoUrl: { type: String, default: '' },
});

const datesSchema = new mongoose.Schema({
  registerBefore: { type: Date, required: true },
  submissionStarts: { type: Date, required: true },
  submissionEnds: { type: Date, required: true },
  resultDate: { type: Date, required: true },
});

const winnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rank: { type: Number, required: true },
  photoUrl: { type: String, required: true },
  videoUrl: { type: String, default: '' },
});

const rewardSchema = new mongoose.Schema({
  rank: { type: Number, required: true },
  prize: { type: Number, required: true },
});

const competitionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, default: 'Dance' },
    tags: [{ type: String }],
    prizePool: { type: Number, required: true, min: 0 },
    entryFee: { type: Number, required: true, min: 0 },
    totalSpots: { type: Number, required: true, default: 20 },
    bookedSpots: { type: Number, required: true, default: 0 },
    judge: { type: judgeSchema, required: true },
    dates: { type: datesSchema, required: true },
    previousWinners: [winnerSchema],
    tabs: {
      about: { type: String, required: true },
      judgingParameters: { type: String, required: true },
      rules: { type: String, required: true },
    },
    rewards: [rewardSchema],
    status: {
      type: String,
      enum: ['upcoming', 'open', 'closed', 'evaluating', 'completed'],
      default: 'open',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Competition', competitionSchema);
