const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const models = require("../models/modelsStore");
const AdminBroMongoose = require("@admin-bro/mongoose");

// Register adapter
AdminBro.registerAdapter(AdminBroMongoose);
const adminBro = new AdminBro({
  resources: [models.users, models.lawyers, models.rentalAgreements],
  rootPath: "/admin",
});

const router = AdminBroExpress.buildRouter(adminBro);
module.exports = router;
