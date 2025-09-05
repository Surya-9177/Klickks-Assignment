const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

module.exports = (db) => {
  router.get("/profile/", authenticateToken, async (req, res) => {
    const { username } = req;
    const userDetails = await db.get(`SELECT * FROM user WHERE username = ?`, [username]);
    res.send(userDetails);
  });

  return router;
};
