const { Router } = require("express");
const { auth, role } = require("../middlewares");
const testRoutes = Router();

testRoutes.get("/", auth, role(['user', 'admin']), (req, res) => {
  return res.status(200).json({ message: "Test route is working" });
});

module.exports = testRoutes;
