const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "portfolio_secret_key",
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio",
};

module.exports = config;
