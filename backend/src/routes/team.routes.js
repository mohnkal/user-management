// src/routes/teamRoutes.js
import express from 'express';
import {
  createTeam,
  getTeamById,
} from '../controllers/team.controller.js';

const router = express.Router();

router.post('/team/', createTeam);
router.get('/team/:id', getTeamById);

export default router;
