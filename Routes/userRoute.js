const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const { login, signUp, LogOut, CheckAuth, MakeAdminOrSuperAdmin, getAllUser, deleteUser } = require("../controller/UserController");
const authorizeSuperAdmin = require("../middleware/isSuperAdminorNot");

router.get("/checkAuth", isAuthenticated, CheckAuth);
router.post("/login", login);
router.post("/register", signUp);
router.post("/logout", LogOut);

// Only for super admin :)
router.patch("/changeRole", isAuthenticated, authorizeSuperAdmin, MakeAdminOrSuperAdmin);
router.get("/getAllUser", isAuthenticated, authorizeSuperAdmin, getAllUser);
router.delete("/deleteUser/:email", isAuthenticated, authorizeSuperAdmin, deleteUser);

module.exports = router;