// Models
const User = require("../models/user");
module.exports = {
  register: async (data, callback) => {
    try {
      const user = new User({
        user_name: data.user_name,
        email: data.email,
        password: data.hashedPassword,
      });
      const newUser = await user.save();
      return callback(null, newUser);
    } catch (error) {
      return callback(error);
    }
  },
  login: async (data, callback) => {
    try {
      const loginUser = await User.findOne({
        email: data.email,
      });
      return callback(null, loginUser);
    } catch (error) {
      return callback(error);
    }
  },
  login: async (data, callback) => {
    try {
      const loginUser = await User.findOne({
        email: data.email,
      });
      return callback(null, loginUser);
    } catch (error) {
      return callback(error);
    }
  },
  updateUser: async (data, callback) => {
    try {
      const user = await User.findByIdAndUpdate(
        data.user_id,
        {
          user_name: data.user_name,
        },
        { new: true }
      );
      return callback(null, user);
    } catch (error) {
      return callback(error);
    }
  },
};
