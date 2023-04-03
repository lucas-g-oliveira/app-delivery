const adminService = require('../services/AdminService');

const findAll = async (req, res, next) => {
  try {
      const users = await adminService.findAll();
      return res.status(200).json({ data: users });
  } catch (error) {
      next(error);
  }
};

const registerUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
      const data = await adminService.registerUser(name, email, password, role);
      return res.status(201).json(data);
  } catch (error) {
      next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id: userToDelete } = req.params;
  try {
      await adminService.deleteUser(userToDelete);
      return res.status(204).send('done');
  } catch (error) {
      next(error);
  }
};

module.exports = { findAll, registerUser, deleteUser };