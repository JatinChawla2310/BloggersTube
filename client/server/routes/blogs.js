const express = require("express");
const router = express.Router();
const Blogs = require("../db/BlogSchema");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

router.post(
  "/addblog",
  fetchUser,
  async (req, res) => {
    try {
      const blog = new Blogs({
        user: req.user.id,
        ...req.body.data,
      });
      const savedBlog = await blog.save();
      res.status(201).send(blog);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/fetchblogs", async (req, res) => {
  try {
    const blogs = await Blogs.find();
    res.status(201).send(blogs);
  } catch (error) {
    res.status(400).json({ error: "Some Internal error" });
  }
});

router.get("/getblog/:id", async (req, res) => {
  try {
    const blog = await Blogs.findById(req.params.id);
    if (!blog) {
      return res.status(400).json({ error: "Not found" });
    }
    res.status(201).send(blog);
  } catch (error) {
    res.status(400).json({ error: "Some Internal error" });
  }
});

router.put(
  "/updateblog/:id",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("desc", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, desc } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      if (!title || !desc) {
        return res.status(400).json({ errors: "Please fill all the fields" });
      }
      const updatedData = {};
      if (title) {
        updatedData.title = title;
      }
      if (desc) {
        updatedData.desc = desc;
      }
      let blog = await Blogs.findById(req.params.id);
      if (!blog) {
        return res.status(400).json({ error: "Not found" });
      }
      if (blog.user.toString() !== req.user.id) {
        return res.status(400).json({ error: "Not Allowed" });
      }
      blog = await Blogs.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedData,
        },
        {
          new: true,
        }
      );
      res.status(201).json({ success: "Data updated", updatedData });
    } catch (error) {
      res.status(400).json({ error: "Some Internal error" });
    }
  }
);

router.delete("/deleteblog/:id", fetchUser, async (req, res) => {
  try {
    let blog = await Blogs.findById(req.params.id);
    if (!blog) {
      return res.status(400).json({ error: "Not found" });
    }
    if (blog.user.toString() !== req.user.id) {
      return res.status(400).json({ error: "Not Allowed" });
    }
    note = await Blogs.findByIdAndDelete(req.params.id);
    res.status(201).json({ success: "Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error: "Some Internal error" });
  }
});

module.exports = router;
