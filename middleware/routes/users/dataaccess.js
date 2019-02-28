const db = require("../../../data/dbConfig");

module.exports = {
  registerUser: userData => db("Users").insert(userData),
  getUserInfo: (UserName, UserDepartment) =>
    UserName
      ? db("Users")
          .where({ UserName })
          .first()
      : db("Users").where({ UserDepartment })
};
