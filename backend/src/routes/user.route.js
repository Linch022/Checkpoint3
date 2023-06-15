const router = require("express").Router();

const userController = require("../controllers/userController");
const { verifyPassword } = require("../services/auth");
const { verifyToken } = require("../services/auth");

router.get("/", verifyToken, userController.browse);
router.get("/:id", verifyToken, userController.read);
router.put("/:id", verifyToken, userController.edit);
router.post("/", verifyToken, userController.add);
router.delete("/:id", verifyToken, userController.destroy);
router.post("/login", userController.login, verifyPassword);

module.exports = router;
