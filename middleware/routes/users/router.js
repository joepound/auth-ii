const sessionRestrict = require("../../auth/session/sessionRestrict");
const sessionDestroy = require("../../auth/session/sessionDestroy");
const jwtRestrict = require("../../auth/jwt/jwtRestrict");

const validate = require("../../errors/bodyValidator"); // For validating data placed in request bodies
const logMsgs = require("./logMsgs"); // Status messages for console logging on this route
const operations = require("./operations"); // Contains the actual work to be done at an endpoint

// Create express router
const router = require("express").Router();

router.get("/auth", sessionRestrict, jwtRestrict, operations.authenticate);

router.post(
  "/register",
  operations.logStartOfOperation(
    "\nAttempting to retrieve user departments..."
  ),
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

router.get(
  "/users",
  sessionRestrict,
  jwtRestrict,
  operations.getUsersInDepartment
);

router.get("/logout", sessionDestroy);

router.get("/departments", operations.getDepartments);

module.exports = router;
