const { User } = require("../../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// route    POST /api/users/register
// desc     register new user
// access   PUBLIC
const register = (req, res) => {
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
};
// route    POST /api/users/login
// desc     login
// access   PUBLIC
const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (!user) return Promise.reject({ err: "User dose not exits !" });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) return res.status(400).json({ errr: "Wrong password" });

      const payload = {
        id: user._id,
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
};
// route    POST /api/users/
// desc     private
// access   PRIVATE(only user signeds)
const testPrivate = (req, res, next) => {
  res.status(200).json({ message: "test private success" });
};
const uploadAvatar = (req, res, next) => {
  const { id } = req.user;
  User.findById(id)
    .then(user => {
      if (!user) return Promise.reject({ errors: "user is not exit !" });
      user.avatar = req.file.path;
      return user.save();
    })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json(err));
};
module.exports = { register, login, testPrivate, uploadAvatar };
