const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const models = require("../models/modelsStore");
const AdminBroMongoose = require("@admin-bro/mongoose");

// Register adapter
AdminBro.registerAdapter(AdminBroMongoose);
const adminBro = new AdminBro(
  {
    resources: [
      models.users,
      models.lawyers,
      models.rentalAgreements,
      models.mutualDivorces,
    ],
    rootPath: "/admin",
    dashboard: {
      handler: async () => {
        return { some: "output" };
      },
      component: AdminBro.bundle("./my-dashboard-component"),
    },
    branding: {
      companyName: "Law On Wheels",
      softwareBrothers: false,
      logo: false,
    },
    locale: {
      language: "en",
      translations: {
        messages: {
          loginWelcome: "",
        },
      },
    },
  },
  { assets: { globalsFromCDN: false } }
);

// Admin credentials
const ADMIN = {
  email: "admin@gmail.com",
  password: "admin",
};

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (ADMIN.password === password && ADMIN.email === email) {
      return ADMIN;
    }
    return null;
  },
  cookieName: "adminbro",
  cookiePassword: "somePassword",
});

//const router = AdminBroExpress.buildRouter(adminBro);
module.exports = router;
