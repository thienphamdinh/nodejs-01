const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const { authenticating, authorizing } = require('../middlewear/auth')
// route    POST /api/users/register
// desc     register new user
// access   PUBLIC
router.post("/register", (req, res) => {
  const { email, password, fullName, userType, phone, DOB } = req.body;

  User.findOne({ $or: [{ email }, { phone }] })
    .then(user => {
      if (user) return Promise.reject({ err: "email exit!" });
      const newUser = new User({
        email,
        password,
        fullName,
        userType,
        phone,
        DOB
      });
      return bcrypt.genSalt(10, (err, salt) => {
        if (err) return Promise.reject(err);

        bcrypt.hash(password, salt, (err, hash) => {
          if (err) return Promise.reject(err);

          newUser.password = hash;
          newUser
            .save()
            .then(user => res.status(200).json(user))
            .catch(err => res.status(400).json(err));
        });
      });
    })
    .catch(err => res.status(400).json(err));
});
// route    POST /api/users/login
// desc     login
// access   PUBLIC
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (!user) return Promise.reject({ err: "User dose not exits !" });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) return res.status(400).json({ errr: "Wrong password" });

      const payload = {
        email: user.email,
        fullName: user.fullName,
        userType: user.userType
      };

      jwt.sign(payload, "secret", { expiresIn: "1h" }, (err, token) => {
        if (err) return res.status(400).json(err);

        return res.status(200).json({
          message: "success",
          token
        });
      });
      // res.status(200).json({
      //   message: "Login success !"
      // });
    });
  });
});
// route    POST /api/users/
// desc     private
// access   PRIVATE(only user signeds)
router.get("/test-private", authenticating, authorizing(["devops","admin"]), (req, res) => {
      res.status(200).json({message: "successful"})
});
module.exports = router;
