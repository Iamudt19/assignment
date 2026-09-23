const mongoose = require('mongoose');
const Competition = require('../models/Competition');
const Registration = require('../models/Registration');

// In-Memory mock store for local execution when MongoDB daemon is offline
let mockCompetitionStore = {
  _id: '65f000000000000000000001',
  title: 'Feedants Classical Dance',
  category: 'Dance',
  tags: ['Dance', 'Multi-Win', 'Winners get certificate'],
  prizePool: 1500,
  entryFee: 99,
  totalSpots: 20,
  bookedSpots: 14,
  status: 'open',
  judge: {
    name: 'Manju Dubey',
    title: 'Kathak Exponent & Choreographer',
    experience: 'Professional Kathak Dancer • 12+ Years of Experience',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  dates: {
    registerBefore: new Date(Date.now() + 100000000),
    submissionStarts: new Date(Date.now() + 200000000),
    submissionEnds: new Date(Date.now() + 500000000),
    resultDate: new Date(Date.now() + 800000000),
  },
  previousWinners: [
    {
      name: 'Aanya Sharma',
      rank: 1,
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      name: 'Riya Patel',
      rank: 2,
      photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      name: 'Sneha Verma',
      rank: 3,
      photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
  ],
  tabs: {
    about: `Welcome to the Feedants Classical Dance Competition! This online event offers a platform for traditional Indian dance forms such as Kathak, Bharatanatyam, Odissi, Manipuri, and Kuchipudi.`,
    judgingParameters: `Submissions are evaluated on four key pillars: Technical Precision, Expression, Choreography, and Video Quality.`,
    rules: `1. Open to solo performers. 2. Duration 1m30s to 3m. 3. Video in HD format.`,
  },
  rewards: [
    { rank: 1, prize: 550 },
    { rank: 2, prize: 300 },
    { rank: 3, prize: 240 },
    { rank: 4, prize: 200 },
    { rank: 5, prize: 130 },
    { rank: 6, prize: 80 },
  ],
  registeredUserIds: [],
};

const isDbConnected = () => mongoose.connection.readyState === 1;

/**
 * @desc    Get single competition details with dynamic registration status
 * @route   GET /api/competitions/:id
 */
const getCompetitionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (isDbConnected()) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid Competition ID' });
      }

      const competition = await Competition.findById(id);
      if (!competition) {
        return res.status(404).json({ success: false, message: 'Competition not found' });
      }

      let isUserRegistered = false;
      if (userId && mongoose.Types.ObjectId.isValid(userId)) {
        const existingRegistration = await Registration.findOne({
          competitionId: id,
          userId: userId,
          paymentStatus: 'success',
        });
        isUserRegistered = !!existingRegistration;
      }

      const spotsLeft = Math.max(0, competition.totalSpots - competition.bookedSpots);

      return res.status(200).json({
        success: true,
        data: {
          ...competition.toObject(),
          isUserRegistered,
          spotsLeft,
        },
      });
    }

    // In-memory fallback response when MongoDB service is offline
    const isUserRegistered = mockCompetitionStore.registeredUserIds.includes(userId);
    const spotsLeft = Math.max(0, mockCompetitionStore.totalSpots - mockCompetitionStore.bookedSpots);

    return res.status(200).json({
      success: true,
      data: {
        ...mockCompetitionStore,
        isUserRegistered,
        spotsLeft,
      },
    });
  } catch (error) {
    console.error('Error fetching competition:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving competition' });
  }
};

/**
 * @desc    Atomic Registration & Spot Booking
 * @route   POST /api/competitions/:id/register
 */
const registerForCompetition = async (req, res) => {
  try {
    const { id } = req.params;
    let { userId } = req.body;

    if (!userId) {
      userId = '65f1a2b3c4d5e6f7a8b9c0d1';
    }

    if (isDbConnected()) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid Competition ID' });
      }

      const existingRegistration = await Registration.findOne({ competitionId: id, userId: userId });
      if (existingRegistration) {
        return res.status(400).json({ success: false, message: 'User is already registered' });
      }

      const updatedCompetition = await Competition.findOneAndUpdate(
        { _id: id, $expr: { $lt: ['$bookedSpots', '$totalSpots'] } },
        { $inc: { bookedSpots: 1 } },
        { new: true }
      );

      if (!updatedCompetition) {
        return res.status(400).json({ success: false, message: 'Registration closed. All spots booked!' });
      }

      await Registration.create({
        competitionId: id,
        userId: userId,
        paymentStatus: 'success',
      });

      const spotsLeft = Math.max(0, updatedCompetition.totalSpots - updatedCompetition.bookedSpots);

      return res.status(200).json({
        success: true,
        message: 'Registration successful!',
        data: {
          ...updatedCompetition.toObject(),
          isUserRegistered: true,
          spotsLeft,
        },
      });
    }

    // In-memory fallback registration
    if (mockCompetitionStore.registeredUserIds.includes(userId)) {
      return res.status(400).json({ success: false, message: 'User is already registered' });
    }

    if (mockCompetitionStore.bookedSpots >= mockCompetitionStore.totalSpots) {
      return res.status(400).json({ success: false, message: 'Registration closed. All spots booked!' });
    }

    mockCompetitionStore.bookedSpots += 1;
    mockCompetitionStore.registeredUserIds.push(userId);

    const spotsLeft = Math.max(0, mockCompetitionStore.totalSpots - mockCompetitionStore.bookedSpots);

    return res.status(200).json({
      success: true,
      message: 'Registration successful!',
      data: {
        ...mockCompetitionStore,
        isUserRegistered: true,
        spotsLeft,
      },
    });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

const getAllCompetitions = async (req, res) => {
  try {
    if (isDbConnected()) {
      const competitions = await Competition.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: competitions.length, data: competitions });
    }
    return res.status(200).json({ success: true, count: 1, data: [mockCompetitionStore] });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getCompetitionById,
  registerForCompetition,
  getAllCompetitions,
};
