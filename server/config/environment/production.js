

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP ||
          process.env.IP ||
          undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT ||
          process.env.PORT ||
          8080,

  sequelize: {
    uri: process.env.SEQUELIZE_URI,
    options: {
      logging: false,
      define: {
        timestamps: false,
      },
    },
  },
};
