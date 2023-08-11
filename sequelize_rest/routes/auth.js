const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/User");

router.post("/createUser", async (req, res) => {
  const { name, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  try {
    const newUser = await User.create({
      name: name,
      email: email,
      password: hash,
    });
    res.status(200).json(req.body);
  } catch (error) {
    res.status(201).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.findOne({
      where: { email },
    });

    if (newUser) {
      const isPasswordCorrect = bcrypt.compareSync(
        password,
        newUser.dataValues.password
      );

      if (!isPasswordCorrect) {
        return res.status(201).json("Incorrect Password");
      } else {
        const token = jwt.sign({ id: newUser.dataValues.id }, "jwtkey");
        res.status(200).json({...newUser.dataValues,token}); // sending with the hashed password and token ... maybe change it later
      }
    } else {
      return res.status(201).json("User does not exist !");
    }
  } catch (error) {
    res.status(201).json(error);
  }
});

router.post("/logout", async (req,res)=>{

  res.status(200).json("User has been logged out.")


})


module.exports = router;
