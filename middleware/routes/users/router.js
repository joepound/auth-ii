const sessionRestrict = require("../../auth/session/sessionRestrict");
const sessionDestroy = require("../../auth/session/sessionDestroy");

const validate = require("../../errors/bodyValidator"); // For validating data placed in request bodies
const logMsgs = require("./logMsgs"); // Status messages for console logging on this route
const operations = require("./operations"); // Contains the actual work to be done at an endpoint

// Create express router
const router = require("express").Router();

router.get("/auth", sessionRestrict, operations.authenticate);

router.post(
  "/register",
  operations.logStartOfOperation("\nAttempting to register new user..."),
  validate(...logMsgs.registerUser).userRegistrationInfo,
  operations.registerUser
);

// Randomize  the secret keys in the environment variables on every login - disallows reuse of secret keys
router.post(
  "/login",
  operations.logStartOfOperation("\nAttempting login..."),
  validate(...logMsgs.login).userLoginCredentials,
  operations.login
);

router.get("/users", sessionRestrict, operations.getUsersInDepartment);

router.get("/logout", sessionDestroy);

module.exports = router;
