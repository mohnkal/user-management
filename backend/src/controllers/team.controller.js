import Team from "../models/team.model.js";
import User from "../models/user.model.js";

// POST /api/team
export const createTeam = async (req, res) => {
  const { name, userIds } = req.body;

  try {
    // Validate userIds and get unique domains
    const users = await User.find({ _id: { $in: userIds } });

    if (!users || users.length === 0) {
      return res.status(400).json({ message: 'No valid users found for the provided IDs' });
    }

    const uniqueDomains = new Set();
    users.forEach(user => {
      uniqueDomains.add(user.domain);
    });

    if (uniqueDomains.size !== userIds.length) {
      return res.status(400).json({ message: 'Users must have unique domains' });
    }

    const newTeam = new Team({ name, users: userIds });
    await newTeam.save();

    const populatedTeam = await Team.findById(newTeam._id).populate('users');

    res.status(201).json(populatedTeam);
  } catch (err) {
    console.error('Error creating team:', err.message);
    res.status(400).json({ message: err.message });
  }
};

// GET /api/team/:id
export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("users");
    if (!team) res.status(404).json({ message: "Team not found" });
    else res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
