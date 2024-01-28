const express = require("express");

const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { JSDOM } = require("jsdom");
const createDOMPurify = require("dompurify");

// Routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const likeRoutes = require("./routes/likeRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const commentRoutes = require("./routes/commentRoutes");

const GlobalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

const app = express();
// Middlewares
app.use(
  cors({
    origin: "https://social-media-app-1212.netlify.app",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "100kb" }));

app.use(helmet());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(hpp());

const { window } = new JSDOM();
const DOMPurify = createDOMPurify(window);
app.use((req, res, next) => {
  // Sanitize request body
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      req.body[key] = DOMPurify.sanitize(req.body[key]);
    });
  }

  // Sanitize request query parameters
  if (req.query) {
    Object.keys(req.query).forEach((key) => {
      req.query[key] = DOMPurify.sanitize(req.query[key]);
    });
  }
  next();
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// API Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/likes", likeRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/notifications", notificationRoutes);

// Through Error if no route exists
app.all("*", (req, res, next) => {
  next(
    new AppError(
      `This route ${req.originalUrl} were not found on this server!`,
      404
    )
  );
});

// Global Error Handler Middleware
app.use(GlobalErrorHandler);

module.exports = app;
