var express = require("express");
var router = express.Router();

const customerAuthRoutes = require("./customer/customer_auth_routes");
const customerCartRoutes = require("./customer/customer_cart_routes");
const customerStoreRoutes = require("./customer/customer_store_routes");
const customerAddressRoutes = require("./customer/customer_address_routes");

const adminAuthRoutes = require("./dashboard/admin_auth_routes");

router.use("/customer", customerAuthRoutes);
router.use("/customer", customerCartRoutes);
router.use("/customer", customerStoreRoutes);
router.use("/customer", customerAddressRoutes);

router.use("/admin", adminAuthRoutes);

module.exports = router;
