const jwt = require("jsonwebtoken");

module.exports = user => {
  const payload = {
    subject: user.UserID,
    username: user.UserName,
    department: user.UserDepartment
  };
  const secret = process.env.JWT_SECRET_KEY || "JWT";
  const options = {
    expiresIn: 60
  };

  return new Promise((res, rej) => {
    const retFunc = (err, token) => (err ? rej(err) : res(token));
    return jwt.sign(payload, secret, options, retFunc);
  });
};
