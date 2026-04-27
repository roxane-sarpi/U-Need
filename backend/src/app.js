const express = require("express");

//create express app
const app = express();

// use some application-level middlewares
app.use(express.json());

const cors = require("cors");

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

// import and mount the API routes

const router = require("./router");

app.use(router);

