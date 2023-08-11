const express = require("express");
const router = express.Router();
const { Comment } = require("../models/comment");

router.get("/getComments/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await Comment.findAll({
      where: {
        blog_id: id,
      },
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/createComment", async (req, res) => {
  const { content, user_id, blog_id } = req.body;

  try {
    const newComment = await Comment.create({
      content,
      user_id,
      blog_id,
    });
    console.log(newComment)
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/createNestedComment", async (req, res) => {
  const { content, user_id, blog_id ,parent_id} = req.body;

  try {
    const newComment = await Comment.create({
      content,
      user_id,
      blog_id,
      parent_id
    });
    console.log(newComment)
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/updateComment", async (req, res) => {
  const { content, user_id, blog_id,id } = req.body;
  try {
    const updatedComment = Comment.update(
      {
        content,
      },
      {
        where: {
          user_id,
          blog_id,
          id
        },
      }
    );
    res.status(200).json(updatedComment)
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/deleteComment" , async(req,res)=>{
  const {user_id,blog_id,id} = req.body
  try {
    const deletedComment = await Comment.destroy({
      where:{
        blog_id,
        user_id,
        id
      }
    })
    res.status(200).json(deletedComment)
    
  } catch (error) {
    res.status(500).json(error)
  }

})



module.exports = router;
