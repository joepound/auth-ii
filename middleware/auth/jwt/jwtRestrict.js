const jwt = require("jsonwebtoken");
const sendError = require("../../errors/errorResponder");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY || "JWT", (err, decoded) => {
      if (err) {
        sendError(res, 401, "You shall not pass (JWT restriction)!");
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    sendError(res, 401, "You shall not pass (JWT restriction)!");
  }
};
