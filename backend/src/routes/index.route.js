const router = require("express").Router();

const user = require("./user.route");
const task = require("./task.route");
const category = require("./category.route");

router.use("/user", user);
router.use("/task", task);
router.use("/category", category);
module.exports = router;
