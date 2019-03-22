const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets.js");
const usersMW = require("./usersMW.js");
const db = require("../data/usersModule.js");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;
  db.findUsername(user.username).then(found => {
    if (found.length) {
      return res.status(405).json({ error: "Username must be unique" });
    } else {
      db.addUser(user)
        .then(saved => {
          res.status(201).json(saved);
        })
        .catch(error => {
          res.status(500).json(error);
        });
    }
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.findUsername(username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = usersMW.makejwt(user);
        res.status(200).json({token});
      } else {
        res
          .status(401)
          .json({ message: "Invalid Login Credentials, Try Again" });
      }
    });
});

router.get("/checkauth", (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, jwtSecret, err => {
    if (err) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
});

module.exports = router;
