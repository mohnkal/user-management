import User from "../models/user.model.js";

// get all
// export const getUsers = async (req, res) => {
//   const {
//     domain,
//     gender,
//     availability,
//     search,
//     page = 1,
//     limit = 10,
//   } = req.query;
//   const query = {};

//   if (domain) query.domain = domain;
//   if (gender) query.gender = gender;
//   if (availability) query.availability = availability === "true";
//   if (search) query.name = { $regex: search, $options: "i" };

//   try {
//     const users = await User.find(query)
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .exec();

//     const count = await User.countDocuments(query);

//     res.json({
//       users,
//       totalPages: Math.ceil(count / limit),
//       currentPage: page,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
export const getUsers = async (req, res) => {
  const {
    domain,
    gender,
    availability,
    search,
    page = 1,
    limit = 10,
  } = req.query;
  const query = {};

  if (domain) query.domain = domain;
  if (gender) query.gender = gender;
  if (availability) query.available = availability === "true";
  if (search) {
    query.$or = [
      { first_name: { $regex: search, $options: "i" } },
      { last_name: { $regex: search, $options: "i" } }
    ];
  }

  try {
    const users = await User.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// get one user
export const getUserbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id); // Use findById to find user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create user
export const createUser = async (req, res) => {
  const user = req.body;
  try {
    const newUser = await User.create(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update
export const updatedUser = async (req, res) => {
  const { id } = req.params;
  const { ...userData } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, userData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
