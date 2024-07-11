// src/routes/teamRoutes.js
import express from 'express';
import {
  createTeam,
  getTeamById,
  removeUserFromTeam
} from '../controllers/team.controller.js';

const router = express.Router();

router.post('/team/', createTeam);
router.get('/team/:id', getTeamById);
router.delete('/team/remove/:teamId/:userId',removeUserFromTeam)

export default router;
