var express = require("express");
var router = express.Router();
const slotsController = require("../../../api/controllers/slots_controller");

const authPolicy = require("../../../api/policies/auth.policy");

router.get("/getDriverBlockedSlots", authPolicy, function(req, res) {
  return slotsController().getDriverBlockedSlots(req, res);
});

router.post("/deleteAllDriverSlots", authPolicy, function(req, res) {
  return slotsController().deleteAllDriverSlots(req, res);
});

router.post("/saveBlockedSlot", authPolicy, function(req, res) {
  return slotsController().saveBlockedSlot(req, res);
});

module.exports = router;
