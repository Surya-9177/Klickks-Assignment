const express = require("express");
const cors = require("cors");
const initializeDb = require("./db");

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");

const app = express();
app.use(express.json());
app.use(cors());

const startServer = async () => {
  try {
    const db = await initializeDb();

    // Routes
    app.use("/", authRoutes(db));
    app.use("/", profileRoutes(db));

    app.listen(8000, () => {
      console.log("server is successfully connected to the server");
    });
  } catch (error) {
    console.error("Error initializing DB:", error);
    process.exit(1);
  }
};

startServer();
