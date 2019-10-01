var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  console.log("Enter root.");
});

router.get("/something", function(req, res, next) {
  console.log("Enter something.");
});

// export your router
module.exports = router;
