const mongoose = require('mongoose');
require('dotenv').config();
const Competition = require('./models/Competition');
const Registration = require('./models/Registration');

const SEED_COMPETITION_ID = '65f000000000000000000001';

const seedData = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/feedants_competition';
    await mongoose.connect(connStr);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Competition.deleteMany({});
    await Registration.deleteMany({});

    // Set dates dynamically relative to current time
    const now = new Date();
    const registerBefore = new Date(now.getTime() + (1 * 24 * 60 * 60 * 1000) + (6 * 60 * 60 * 1000) + (28 * 60 * 1000) + (32 * 1000));
    const submissionStarts = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
    const submissionEnds = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
    const resultDate = new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000);

    const feedantsClassicalDance = {
      _id: SEED_COMPETITION_ID,
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
        registerBefore,
        submissionStarts,
        submissionEnds,
        resultDate,
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
        {
          name: 'Pooja Iyer',
          rank: 4,
          photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        },
      ],
      tabs: {
        about: `Welcome to the Feedants Classical Dance Competition! This online event offers a platform for traditional Indian dance forms such as Kathak, Bharatanatyam, Odissi, Manipuri, and Kuchipudi. Showcase your grace, rhythm, storytelling, and stage presence from the comfort of your home. Participants are judged on expression (Abhinaya), rhythm (Tala), posture, and overall presentation.`,
        judgingParameters: `Submissions are evaluated on four key pillars:
1. Technical Precision & Rhythm (30%): Mastery of footwork (Tatkar), hand gestures (Mudras), and beat timing.
2. Expression & Storytelling (30%): Facial expressions (Mukhajabhinaya) conveying emotional depth.
3. Choreography & Presentation (20%): Fluid transitions, posture, and traditional attire.
4. Video & Audio Quality (20%): Clear lighting, full-body visibility, and unedited dance audio track.`,
        rules: `1. Entry is strictly open to solo performers of all age groups.
2. Video duration must be between 1 minute 30 seconds and 3 minutes.
3. Submissions must be filmed horizontally in high resolution (min 720p).
4. Only unedited, single-take video recordings will be accepted; post-production speed modifications or cuts will lead to disqualification.
5. All participants must pay the ₹99 entry fee prior to uploading their submission.`,
      },
      rewards: [
        { rank: 1, prize: 550 },
        { rank: 2, prize: 300 },
        { rank: 3, prize: 240 },
        { rank: 4, prize: 200 },
        { rank: 5, prize: 130 },
        { rank: 6, prize: 80 },
      ],
    };

    const createdCompetition = await Competition.create(feedantsClassicalDance);
    console.log('Seed competition created successfully!');
    console.log('ID:', createdCompetition._id);

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
