"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      tax: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      total: DataTypes.INTEGER,
      totalPaidToStore: DataTypes.INTEGER,
      tip: DataTypes.INTEGER,
      deliveryFees: DataTypes.INTEGER,
      deliveryAddress: {
        type: DataTypes.TEXT,
        get: function() {
          return JSON.parse(this.getDataValue("deliveryAddress"));
        },
        set: function(value) {
          return this.setDataValue("deliveryAddress", JSON.stringify(value));
        }
      },
      status: {
        type: DataTypes.INTEGER,
        get: function() {
          switch (this.getDataValue("status")) {
            case 0:
              return { code: 0, name: "AwaitingPayment" };
            case 1:
              return { code: 1, name: "Paid" };
            default:
              return { code: null, name: null };
          }
        },
        set: function(value) {
          return this.setDataValue("status", value);
        }
      },
      failedStatus: DataTypes.INTEGER,
      penalty: DataTypes.INTEGER,
      deliveredAt: DataTypes.DATE,
      returnedAt: DataTypes.DATE,
      slotStart: DataTypes.DATE,
      slotEnd: DataTypes.DATE,
      refundedAmount: DataTypes.INTEGER,
      kegsDeliveredQty: DataTypes.INTEGER,
      tapsDeliveredQty: DataTypes.INTEGER,
      kegsReturnedQty: DataTypes.INTEGER,
      tapsReturnedQty: DataTypes.INTEGER,
      customerId: DataTypes.INTEGER,
      storeId: DataTypes.INTEGER,
      paymentCompleted: DataTypes.BOOLEAN,
      billingAddress: {
        type: DataTypes.TEXT,
        get: function() {
          return JSON.parse(this.getDataValue("billingAddress"));
        },
        set: function(value) {
          return this.setDataValue("billingAddress", JSON.stringify(value));
        }
      },
      stripeToken: DataTypes.STRING
    },
    {}
  );
  Order.associate = function(models) {
    Order.belongsTo(models.Customer, {
      foreignKey: "id",
      sourceKey: "customerId"
    });
    Order.belongsTo(models.Store, {
      foreignKey: "id",
      sourceKey: "storeId"
    });
    Order.hasMany(models.LineItem);
    // Order.belongsToMany(models.Product, { through: models.LineItem });
    Order.belongsToMany(models.Inventory, { through: models.LineItem });
  };
  return Order;
};
