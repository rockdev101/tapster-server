var express = require("express");
var router = express.Router();
const orderQueryController = require("../../../api/controllers/orders/orders_query_controller");
const authPolicy = require("../../../api/policies/auth.policy");

router.get("/getOrders", authPolicy, function(req, res) {
  return orderQueryController().getOrdersByStoreId(req, res);
});

module.exports = router;
