/*
 *Express বানায়, সব middleware আর routes একসাথে জোড়া লাগায়

    app.use(cors()); 
    app.use(express.json());
    app.use('/api/v1', routes);
    app.use(errorHandler); // সবার শেষে 
 */


const express = require("express")
const cors = require("cors")
const routes = require("./api/routes")
const errorHandler = require("./api/middlewares/errorHandler")
const connectDB = require("./config/db")  // ← add করো

// ── Models Import ─────────────────────────────────────────────
require("./models/User.model")
require("./models/Category.model")
require("./models/Product.model")
require("./models/Order.model")
require("./models/Cart.model")
require("./models/Review.model")
require("./models/BlacklistedToken.model")

const app = express()

// ← Vercel serverless fix
let isConnected = false
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectDB()
    isConnected = true
  }
  next()
})

app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(",") || [],
  credentials: true,
}))

app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "UrbanThread BD API is running!" })
})

app.use("/api/v1", routes)
app.use(errorHandler)

module.exports = app