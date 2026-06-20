const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const authRouter = require("./routes/auth");
const env = require("./config/env");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const resumeRouter = require("./routes/resumes");
const healthRouter = require("./routes/health");
const dashboardRouter = require("./routes/dashboard");
const insightsRouter = require("./routes/insights");
const versionsRouter = require("./routes/versions");
const historyRouter = require("./routes/history");

const app = express();

app.set("trust proxy", 1);

// CORS configuration - production ke liye specific origin dena zyada safe hota hai
const allowedOrigins = [
  "https://ai-powered-resume-analyzer-pied.vercel.app", // Aapka frontend url
  "http://localhost:5173", // Local development ke liye
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());

if (!env.isProd) app.use(morgan("dev"));

// Database Middleware for Serverless (Tension-free DB connection)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("Database connection failed inside middleware:", err.message);
    res.status(500).json({ error: "Database connection error" });
  }
});

// Routes
app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/insights", insightsRouter);
app.use("/api/versions", versionsRouter);
app.use("/api/history", historyRouter);

// Error Handlers
app.use(notFound);
app.use(errorHandler);

// Sirf local development ke liye server listen karega, Vercel isko khud handle karega
if (process.env.NODE_ENV !== "production") {
  app.listen(env.port || 5000, () => {
    console.log(`Server listening on http://localhost:${env.port || 5000}`);
  });
}

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason);
});

module.exports = app;
