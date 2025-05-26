const { register, login, updateUser } = require("../services/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    const data = req.body;
    data.hashedPassword = await bcrypt.hash(data.password, 10);
    await register(data, (error, results) => {
      if (!error) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "User added successfully",
          body: results,
        });
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },
  login: async (req, res) => {
    const data = req.body;
    await login(data, async (error, results) => {
      if (!error) {
        if (results) {
          const isValidPassword = await bcrypt.compare(
            data.password,
            results.password
          );
          if (isValidPassword) {
            // generate JWT token
            const token = jwt.sign(
              {
                id: results._id,
                email: results.email,
                user_name: results.user_name,
              },
              process.env.JWT,
              {
                expiresIn: "9h",
              }
            );
            res.status(200).json({
              status: 200,
              success: true,
              access_token: token,
              message: "Login successfully",
              body: results,
            });
          } else {
            res.status(401).json({
              status: 401,
              success: false,
              message: "Password not valid",
              body: null,
            });
          }
        } else {
          res.status(404).json({
            status: 404,
            success: false,
            message: "User not found",
            body: null,
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },
  updateUser: async (req, res) => {
    const data = req.body;
    data.user_id = req.user_id;

    await updateUser(data, (error, results) => {
      if (!error) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "User updated successfully",
          body: results,
        });
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },
};
