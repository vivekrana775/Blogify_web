const express = require("express");
const router = express.Router();
const { Blog } = require("../models/blog");


router.get("/getAllBlogs", async (req, res) => {

  const blogs = await Blog.findAll();
  res.status(200).json(blogs);
  
});



router.get("/getBlog/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  res.status(200).json(blog);
});

router.post("/createBlog", async (req, res) => {
  const { title, content, likes, user_id, img ,category} = req.body;
  try {
    const newBlog = await Blog.create({
      title,
      content,
      likes,
      user_id,
      img,
      category,
    });

    res.status(200).json(newBlog);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/deleteBlog/:id", async (req, res) => {
  try {
    const result = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ "Successfully deleted": result });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/updateBlog/:id", async (req, res) => {
  const { title, content, likes, user_id, img ,category} = req.body;

  const upadtedBlog = await Blog.update(
    {
      title,
      content,
      likes,
      user_id,
      img,
      category,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  res.status(200).json(upadtedBlog);
});

module.exports = router;
