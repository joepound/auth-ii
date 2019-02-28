const bcrypt = require("bcryptjs");

const dbHelper = require("./dataaccess");
const sendError = require("../../errors/errorResponder");

const authenticate = (req, res) => {
  res.status(200).json({ success: true, data: { message: "Authenticated." } });
};

const registerUser = (req, res) => {
  const userData = req.body;
  userData.UserPassword = bcrypt.hashSync(userData.UserPassword, 12);

  console.log("Proceeding to register the new user...");
  dbHelper
    .registerUser(userData)
    .then(() => {
      res.status(201).json({
        success: true,
        data: { message: `User ${userData.UserName} has been registered.` }
      });
      console.log("User registration attempt finished.");
    })
    .catch(err => {
      sendError(res, 500, err);
      console.log("User registration attempt finished.");
    });
};

const login = (req, res) => {
  const userData = req.body;

  console.log("Retrieving user information records...");
  dbHelper
    .getUserInfo(userData.UserName)
    .then(userMatch => {
      console.log("Checking if user exists...");
      if (userMatch) {
        console.log("Checking if correct password was supplied...");
        if (bcrypt.compareSync(userData.UserPassword, userMatch.UserPassword)) {
          req.session.user = userMatch;
        } else {
          sendError(res, 401, "You shall not pass!");
        }
      } else {
        sendError(res, 404, `User "${userData.UserName} does not exist."`);
      }
      console.log("User login attempt finished.");
    })
    .catch(err => {
      sendError(res, 500, err);
      console.log("User login attempt finished.");
    });
};

const getUsersInDepartment = (req, res) => {
  console.log("\nAttempting to GET all users...");
  dbHelper
    .getUserInfo()
    .then(users => {
      res.status(200).json({ success: true, data: users });
      console.log("GET attempt for all users finished.");
    })
    .catch(err => {
      sendError(res, 500, err);
      console.log("GET attempt for all users finished.");
    });
};

module.exports = {
  authenticate,
  registerUser,
  login,
  getUsersInDepartment
};
