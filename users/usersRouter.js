const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets.js");
const usersMW = require("./usersMW.js");
const db = require("../data/usersModule.js");
const { authenticate } = require("../api/globalMW.js");

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

router.get("/accountinfo", authenticate, (req, res) => {
  const userId = req.decoded.subject
  db.getUser(userId)
  .then(account => {
    res.status(200).json(account);
  })
  .catch(({ code, message }) => {
    res.status(code).json({ message });
  });
})

router.put("/accountinfo/edit", authenticate, (req, res) => {
  const userId = req.decoded.subject;
  const {
username, password, fullName, email, oAuth
  } = req.body;
  const changes = {
username, password, fullName, email, oAuth
  };
  db.editUser(userId, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          message:
            "Unable to find any user account entry matching the userId provided"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
})

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
