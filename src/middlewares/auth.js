const jsonwebtoken = require("jsonwebtoken");
module.exports = {
  checkLogin: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      res.status(401).json({
        success: false,
        error_code: 11100,
        message: "No Authorization Header Token",
      });
      return;
    }
    if (authHeader.split(" ")[0] != "Bearer") {
      res.status(401).json({
        success: false,
        error_code: 11150,
        message: "No Bearer Token",
      });
      return;
    }
    const token = authHeader.split(" ")[1];
    jsonwebtoken.verify(token, process.env.JWT, (err, token_data) => {
      if (!err) {
        const { id, email, user_name } = token_data;
        req.user_id = id;
        req.email = email;
        req.user_name = user_name;
        next();
      } else {
        res.status(401).json({
          success: false,
          error_code: 11200,
          message: "Invalid Bearer Token",
        });
      }
    });
  },
};
