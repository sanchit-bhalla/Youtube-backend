import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Configures the `Access-Control-Allow-Origin` CORS header. We generally want to allow our frontend app origin only
    credentials: true, // Configures the `Access-Control-Allow-Credentials` CORS header. Set to true to pass the header, otherwise it is omitted.
  })
);

/*
    Middleware is a function or piece of code that is called (run) between when a server gets a request from a client and when it sends a response back to the client. Middleware can take many forms, like simple logs:

    `extended` option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). The “extended” syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. For more information, please see the qs library.
  */
//  ******* Basically we need to parse different types of data. So we need different middlewares *******
app.use(express.json({ limit: "16kb" })); // parses incoming requests with JSON payloads. ( POST / PATCH requests - ?)
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // parses incoming requests with urlencoded payloads. (Parse Data from form - ? and from url also - ?)
app.use(express.static("public")); // express.static(root, [options]) - builtin middlewares for serving static files. The root argument specifies the root directory from which to serve static assets
app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.

// import routes
import userRouter from "./routes/user.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import videoRouter from "./routes/video.routes.js";
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";

// routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/dashboard", dashboardRouter);

export { app };
