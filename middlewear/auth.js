const jwt = require("jsonwebtoken");

authenticating = (req, res, next) => {
  const token = req.header("Authorization");
  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json(error);
  }
};

const authorizing = userTypeArray => {
  return (req, res, next) => {
    const { userType } = req.user;
    if (userTypeArray.indexOf(userType) > -1) {
      return next();
    } else {
      res.status(403).json({ errors: "you not access" });
    }
  };
};

module.exports = {
  authenticating,
  authorizing
};
