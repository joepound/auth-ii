const bcrypt = require("bcryptjs");
const jwtGenToken = require("../../auth/jwt/jwtGenToken");

const dbHelper = require("./dataaccess");
const mappers = require("./mappers");
const sendError = require("../../errors/errorResponder");

const logStartOfOperation = entryMsg => (req, res, next) => {
  console.log(entryMsg);
  next();
};

const authenticate = (req, res) => {
  res.status(200).json({ success: true, message: "Authenticated." });
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
        message: `User ${userData.UserName} has been registered.`
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
          console.log("Setting up session...");
          req.session.user = userMatch;
          console.log("Setting up token...");
          jwtGenToken(userMatch).then(token =>
            res.status(200).json({
              success: true,
              message: `Login for user ${userData.UserName} was successful.`,
              token
            })
          );
        } else {
          sendError(res, 401, "You shall not pass!");
        }
      } else {
        sendError(res, 404, `User ${userData.UserName} does not exist."`);
      }
      console.log("User login attempt finished.");
    })
    .catch(err => {
      sendError(res, 500, err);
      console.log("User login attempt finished.");
    });
};

const getUsersInDepartment = (req, res) => {
  if (req.session && req.session.user) {
    const department = req.session.user.UserDepartment;

    console.log(
      `\nAttempting to GET all users in the department ${department}...`
    );
    dbHelper
      .getUsersInDepartment(department)
      .then(users => {
        res.status(200).json({ success: true, users });
        console.log("GET attempt for all users finished.");
      })
      .catch(err => {
        sendError(res, 500, err);
        console.log("GET attempt for all users finished.");
      });
  } else {
    console.log(
      "There was an error in reading user data in the current session."
    );
  }
};

const getDepartments = (req, res) => {
  dbHelper.getDepartments().then(departments => {
    departments = mappers.userDepartmentsToString(departments);
    res.status(200).json({ success: true, departments });
    console.log("GET attempt for all user departments finished.");
  });
};

module.exports = {
  logStartOfOperation,
  authenticate,
  registerUser,
  login,
  getUsersInDepartment,
  getDepartments
};
