/* Server imports */

const express = require("express");

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const session = require("express-session");

const corsConfig = require("./middleware/corsConfig");
const sessionConfig = require("./middleware/auth/session/sessionConfig");

const rootRouter = require("./middleware/routes/rootRouter");
const usersRouter = require("./middleware/routes/users/router");
const errorRouter = require("./middleware/routes/errorRouter");

// server setup
const server = express();

// built-in middleware
server.use(express.json());

// third party middleware
server.use(cors(corsConfig));
server.use(helmet());
server.use(morgan("dev"));
server.use(session(sessionConfig)); // Configured session length is currently at: 1 minute

// custom routing middleware
server.use("/", rootRouter); // routing for root URL
server.use("/api", usersRouter);
server.use(errorRouter); // routing for URL's resolving to bad queries

module.exports = server;
