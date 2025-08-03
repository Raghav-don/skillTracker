import express from 'express';
import Skill from '../models/Skill.js';
import { authMiddleware } from './auth.js';

const router = express.Router();

// Get all skills of logged-in user
router.get('/', authMiddleware, async (req, res) => {
  const skills = await Skill.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(skills);
});

// Add new skill
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, progress } = req.body;

  const skill = new Skill({
    user: req.user.id,
    title,
    description,
    progress,
    progressHistory: [{ value: progress }],
  });

  await skill.save();
  res.status(201).json(skill);
});

// Update skill
router.put('/:id', authMiddleware, async (req, res) => {
  const updated = await Skill.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Delete skill
router.delete('/:id', authMiddleware, async (req, res) => {
  await Skill.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ msg: 'Skill deleted' });
});

export default router;
