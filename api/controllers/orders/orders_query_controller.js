const Sequelize = require("sequelize");
const db = require("../../../api/services/db.service");
const OrderStatus = require("../../constant/enum").OrderStatus;

const OrderQueryController = () => {
  // customer app
  const getCustomerOrders = async (req, res) => {
    try {
      const customerId = req.token.id;
      return res.status(200).json({
        orders: await getAllBy({ customerId }),
        message: "Successfully returned Orders",
        StatusCode: 1
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };
  // driver app
  const getNewOrders = async (req, res) => {
    try {
      const condition = {
        status: {
          [Sequelize.Op.in]: [
            OrderStatus.KEG_READY,
            OrderStatus.SCHEDULED4PICKUP
          ]
        }
      };
      return res.status(200).json({
        orders: await getAllBy(condition),
        message: "Successfully returned Orders",
        StatusCode: 1
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const getDriverOrderHistory = async (req, res) => {
    try {
      query = req.query;
      const condition = {
        status: {
          [Sequelize.Op.in]: [
            OrderStatus.ASSIGNED2DRIVER4DELIVERY,
            OrderStatus.DELIVERED,
            OrderStatus.ASSIGNED2DRIVER4PICKUP,
            OrderStatus.SCHEDULED4PICKUP,
            OrderStatus.RETURNED,
            OrderStatus.DELIVERYFAILED,
            OrderStatus.PICKUPFAILED,
            OrderStatus.PARTIALPICKUP
          ]
        },
        createdAt: {
          [Sequelize.Op.gte]: query.startDate
        },
        createdAt: {
          [Sequelize.Op.lte]: query.endDate
        }
      };
      return res.status(200).json({
        orders: await getDriverAllBy(condition, query.code),
        message: "Successfully returned Orders",
        StatusCode: 1
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const getbyId = async (req, res) => {
    try {
      const { id } = req.query;
      const order = await getOneBy({ id });
      return res.status(200).json({
        order,
        message: "Successfully returned Orders",
        StatusCode: 1
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const getAllBy = async condition => {
    try {
      return await db.Order.findAll({
        where: condition,
        include: [db.LineItem]
      });
    } catch (err) {
      console.log(err);
      throw new Error("Internal server error");
    }
  };

  const getDriverAllBy = async (condition, code) => {
    try {
      return await db.Order.findAll({
        where: condition,
        include: [
          db.LineItem,
          {
            model: db.Driver,
            where: { code }
          }
        ]
      });
    } catch (err) {
      console.log(err);
      throw new Error("Internal server error");
    }
  };

  const getOneBy = async condition => {
    try {
      const order = await db.Order.findOne({
        where: condition,
        include: [
          {
            model: db.LineItem,
            include: [
              {
                model: db.Inventory,
                include: [
                  {
                    model: db.CategorySizes
                    // include: [
                    //   {
                    //     model: db.Size
                    //   }
                    // ]
                  }
                ]
              }
            ]
          },
          {
            model: db.Customer,
            include: [
              {
                model: db.UserLocation,
                where: { isActive: true },
                limit: 1,
                as: "addresses"
              }
            ]
          }
        ]
      });
      return order;
    } catch (err) {
      console.log(err);
      throw new Error("Internal server error");
    }
  };

  return {
    getNewOrders,
    getDriverOrderHistory,
    getCustomerOrders,
    getbyId
  };
};

module.exports = OrderQueryController;
