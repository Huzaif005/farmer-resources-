import express from 'express';
import { getProfile, saveProfile } from '../controllers/profileController.js';

const router = express.Router();

// Get farmer profile by email
router.get('/:email', getProfile);

// Save farmer profile
router.post('/', saveProfile);

export default router;
