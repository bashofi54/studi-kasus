const router = require("express").Router();
const authCntrl = require("./controller");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy({usernameField: "email"}, authCntrl.localStrategy)
);
router.get("/users", authCntrl.getUsers);
router.post("/register", authCntrl.register);
router.post("/login", authCntrl.login);
router.delete("/logout", authCntrl.logout);
router.get("/me", authCntrl.me);
module.exports = router;
