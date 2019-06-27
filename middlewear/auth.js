const jwt = require("jsonwebtoken");

authenticating = (req, res, next) => {
  const token = req.header("Authorization");
  const fingerprint = req.header("fingerprint");
  const KEY = "Secret" + fingerprint;
  try {
    const decoded = jwt.verify(token, KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({error: "Token or Fingerprint invalid"});
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
