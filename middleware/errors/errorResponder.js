const sqlErrors = require("./sqlErrorList");

module.exports = (res, code, err) => {
  res.status(code).json({
    success: false,
    code,
    // Numeric type -> error code; other types -> error message/object
    errorInfo: err.errno ? sqlErrors[err.errno] : err.toString()
  });
};
