/*
 *Express বানায়, সব middleware আর routes একসাথে জোড়া লাগায়

    app.use(cors()); 
    app.use(express.json());
    app.use('/api/v1', routes);
    app.use(errorHandler); // সবার শেষে 
 */


const express = require("express");

// Deploy এ এটা করো
app.use(cors({
  origin: process.env.CORS_ORIGINS.split(","),
  credentials: true,
}));
const routes = require("./api/routes");
const errorHandler = require("./api/middlewares/errorHandler");

// ── Models Import ─────────────────────────────────────────────
require("./models/User.model");
require("./models/Category.model");
require("./models/Product.model");
require("./models/Order.model");
require("./models/Cart.model");
require("./models/Review.model");
require("./models/BlacklistedToken.model");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);
app.use(errorHandler);

module.exports = app;