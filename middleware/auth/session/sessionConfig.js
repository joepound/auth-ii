module.exports = {
  name: "Hello World",
  secret: process.env.SESSION_SECRET_KEY || "SESSION",
  cookie: {
    maxAge: 1000 * 60 * 1,
    secure: false
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false,
  store: require("./sessionStore")
};
