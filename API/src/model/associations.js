const config = require("./configuration").getModel();
const task = require("./task").getModel();

// SalesItem.belongsTo(Item, { foreignKey: "itemId", targetKey: "id" });
// Item.hasMany(SalesItem, { foreignKey: "itemId", targetKey: "id" });
