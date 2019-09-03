require("dotenv").config(); // Allows access to .env vars throughout entire app
var _ = require("lodash");
var repl = require("repl");
const environment = process.env.NODE_ENV;

// Sequelize Database Models:
const Category = require("../models").Category;
const CategorySizes = require("../models").CategorySizes;
const Size = require("../models").Size;
const Product = require("../models").Product;
const Order = require("../models").Order;
const LineItem = require("../models").LineItem;
const Customer = require("../models").Customer;

var replServer = repl.start({
  prompt: "Tapster Node Console> "
});

replServer.context.Category = Category;
replServer.context.Product = Product;
replServer.context.Order = Order;
replServer.context.LineItem = LineItem;
replServer.context.Customer = Customer;
replServer.context.CategorySizes = CategorySizes;
replServer.context.Size = Size;
replServer.context._ = _;

// Product.belongsTo(Category);

// Product.findAll().then(prod => console.log(prod));

// Product.findOne({ where: { id: 1 } }).then(prod => console.log(prod.category));
// Product.belongsTo(Category, { foreignKey: "categoryId" });

// const p1 = await Product.findOne({ where: { id: 1 }, include: [Category] });
// p1.Category.name

// cat = await Category.findOne({ where: { id: 1 }, include: [Product] });
// _.first(cat.Products).name;
