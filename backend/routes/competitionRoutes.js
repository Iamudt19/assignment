const express = require('express');
const router = express.Router();
const {
  getCompetitionById,
  registerForCompetition,
  getAllCompetitions,
} = require('../controllers/competitionController');

router.get('/', getAllCompetitions);
router.get('/:id', getCompetitionById);
router.post('/:id/register', registerForCompetition);

module.exports = router;
