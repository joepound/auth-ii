const sendError = require("../errors/errorResponder");

module.exports = (entryMsg, checkMsg, errorExitMsg) => ({
  userRegistrationInfo: (req, res, next) => {
    console.log(entryMsg);

    const userData = req.body;

    console.log(checkMsg);
    if (!userData.UserName) {
      sendError(res, 400, "Username not supplied.");
      console.log(errorExitMsg);
    } else if (!userData.UserPassword) {
      sendError(res, 400, "Password not supplied.");
      console.log(errorExitMsg);
    } else if (!userData.UserDepartment) {
      sendError(res, 400, "Associated department not supplied.");
      console.log(errorExitMsg);
    } else {
      next();
    }
  },
  userLoginCredentials: (req, res, next) => {
    console.log(entryMsg);

    const userData = req.body;

    console.log(checkMsg);
    if (!userData.UserName) {
      sendError(res, 400, "Username not supplied.");
      console.log(errorExitMsg);
    } else if (!userData.UserPassword) {
      sendError(res, 400, "Password not supplied.");
      console.log(errorExitMsg);
    } else {
      next();
    }
  }
});
