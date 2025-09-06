const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

module.exports = (db) => {
  router.post("/register/", async (req, res) => {
    const { username, password } = req.body;
    try {
      const checkUser = await db.get(`SELECT * FROM user WHERE username = ?`, [username]);

      if (!checkUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.run(`INSERT INTO user (username, password) VALUES (?, ?)`, [username, hashedPassword]);
        res.status(201).send({message: "User created successfully, Please login using your credentials!"});
      } else {
        res.status(400).send({error: "User already exists"});
      }
    } catch (e) {
      console.log("Error while creating user:", e);
      res.status(500).send("Internal Server Error");
    }
  });

  router.post("/login/", async (req, res) => {
    const { username, password } = req.body;
    const dbUser = await db.get(`SELECT * FROM user WHERE username = ?`, [username]);

    if (!dbUser) {
      res.status(400).send({error: "Invalid User"});
    } else {
      const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
      if (isPasswordMatched) {
        const payload = { username };
        const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
        res.send({ jwtToken });
      } else {
        res.status(400).send({error: "Invalid Password"});
      };
    }

  });

  return router;
};
