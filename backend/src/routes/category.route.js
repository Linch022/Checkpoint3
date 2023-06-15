const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const { verifyToken } = require("../services/auth");

router.get("/", verifyToken, categoryController.browse);
router.get("/:id", verifyToken, categoryController.read);
router.put("/:id", verifyToken, categoryController.edit);
router.post("/", verifyToken, categoryController.add);
router.delete("/:id", verifyToken, categoryController.destroy);

module.exports = router;
