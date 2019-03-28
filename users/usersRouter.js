const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets.js");
const usersMW = require("./usersMW.js");
const db = require("../data/usersModule.js");
const { authenticate } = require("../api/globalMW.js");

router.post("/register", (req, res) => {
  let register = req.body;
  const hash = bcrypt.hashSync(register.password, 10); // 2 ^ n
  register.password = hash;
  db.findUsername(register.username).then(found => {
    if (found.length) {
      return res.status(405).json({ error: "Username must be unique" });
    } else {
      db.addUser(register)
        .then(user => {
          const token = usersMW.makejwt(user);
          res.status(200).json({ token });
        })
        .catch(error => {
          res.status(500).json(error);
        });
    }
  });
});

router.post("/login", (req, res) => {
  console.log(req.body)
  console.log(typeof req.body.uid)
  const { displayName, email, photoURL, uid } = req.body;
  const firebaseUser = { displayName, email, photoURL, uid };
  if (!uid || typeof uid !== "string") {
    return res.status(401).json({ error: "Invalid server-side login. A uid must be provided as a string in req.body.uid"})
  }
  db.findUid(uid)
    .then(user => {
      if (user.length) {
        const token = usersMW.makejwt(user);
        res.status(200).json({ token });
      } else {
        db.addUser(firebaseUser)
          .then(newuser => {
            const token = usersMW.makejwt(newuser);
            res.status(201).json({ token });
          })
          .catch(({ code, message }) => {
            res.status(code).json({ message });
          });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.get("/accountinfo", authenticate, (req, res) => {
  const userId = req.decoded.subject;
  db.getUser(userId)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.put("/accountinfo/edit", authenticate, (req, res) => {
  const userId = req.decoded.subject;
  const { displayName, email, photoURL } = req.body;
  const changes = {
    displayName, email, photoURL
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
