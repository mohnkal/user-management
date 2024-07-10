import express from "express";
import { getUsers, getUserbyId, createUser, deleteUser, updatedUser } from '../controllers/user.controller.js';

const router = express.Router()

router.get('/users/', getUsers);
router.get('/users/:id', getUserbyId);
router.post('/users/', createUser);
router.put('/users/:id', updatedUser);
router.delete('/users/:id', deleteUser);

export default router;

