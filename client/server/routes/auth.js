const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../db/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fetchUser = require("../middleware/fetchUser");
const JWT_SECRET = process.env.JWT_SECRET;

let success = false;

// Register
router.post(
  "/register",
  [
    body("username", "Enter a valid username").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a strong password").isLength({ min: 5 }),
    body("cpassword").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const { username, email, password, cpassword } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      success = false;
      return res.status(400).json({ error: error.array(), success });
    }
    if (!email || !username || !password || !cpassword) {
      console.log("field empty");
      success = false;
      return res
        .status(400)
        .json({ error: "Please fill all the fields", success });
    }
    try {
      let user = await User.findOne({ email });
      let userName = await User.findOne({ username });
      if (user) {
        success = false;
        res
          .status(400)
          .json({ error: "User with this email already exist", success });
      } else if (userName) {
        success = false;
        res
          .status(400)
          .json({ error: "User with this username already exist", success });
      } else if (password !== cpassword) {
        success = false;
        res.status(400).json({ error: "Passwords Does not match", success });
      } else {
        user = new User({ username, email, password, cpassword });
        const userRegistered = await user.save();
        success = true;
        res.status(201).json({ user, success });
      }
    } catch (error) {
      res.status(400).json({ error: "Registration not successful" });
    }
  }
);

// Login
router.post(
  "/login",
  [
    body("username", "Enter a valid username").isLength({ min: 3 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const { username, password } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      success = false;
      return res.status(400).json({ error: error.array(), success });
    }
    if (!username || !password) {
      success = false;
      return res
        .status(422)
        .json({ error: "Please fill all the fields", success });
    }
    try {
      let user = await User.findOne({ username });
      if (user) {
        let passComp = await bcrypt.compare(password, user.password);
        if (passComp) {
          const data = {
            user: {
              id: user.id,
            },
          };
          const authToken = jwt.sign(data, JWT_SECRET);
          success = true;
          res.status(201).json({ success, authToken, id: user.id });
        } else {
          success = false;
          res.status(400).json({ error: "Invalid Credentials", success });
        }
      } else {
        success = false;
        res.status(400).json({ error: "Invalid Credentials", success });
      }
    } catch (error) {
      success = false;
      res.status(500).json({ error: "Something went wrong", success });
    }
  }
);

module.exports = router;
