const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../db/UserSchema");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const bcrypt = require("bcryptjs");
const Blogs = require("../db/BlogSchema");

router.put(
  "/updateuser/:id",
  fetchUser,

  async (req, res) => {
    const { username, email, password, profilePic } = req.body.credentials;
    try {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);
      const updatedData = { username, email, password: secPass, profilePic };
      
      let user = await User.findById(req.params.id);
      if (!user) {
        return res.status(400).json({ error: "Not found" });
      }
      if (user.id.toString() !== req.user.id) {
        return res.status(400).json({ error: "Not Allowed" });
      }
      user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedData,
        },
        {
          new: true,
        }
      );
      res.status(201).json({ success: "Data updated" });
    } catch (error) {
      console.log(error);
      res.status(400).send("Something went wrong");
    }
  }
);

router.delete("/deleteuser/:id", fetchUser, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ error: "Not found" });
    }
    if (user.id.toString() !== req.user.id) {
      return res.status(400).json({ error: "Not Allowed" });
    }
    await Blogs.deleteMany({ user: user.id });
    user = await User.findByIdAndDelete(req.params.id);
    res.status(201).json({ success: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Some Internal error" });
  }
});

router.get("/getuser/:id", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ error: "Not found" });
    }
    const { password, cpassword, ...others } = user._doc;
    return res.status(201).json(others);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
