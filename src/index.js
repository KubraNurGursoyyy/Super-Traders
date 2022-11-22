'use strict';
const express = require('express');
const {SharesRoutes, UserRoutes, PortfolioRoutes, WalletRoutes} = require("./modules");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", [WalletRoutes, SharesRoutes, PortfolioRoutes, UserRoutes]);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});




