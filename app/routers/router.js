let express = require("express");
let router = express.Router();
const user = require("../controllers/user.js");

router.post("/api/user/create", user.createUser);
router.get("/api/user/age-distribution", user.getAgeDistribution);

module.exports = router;
