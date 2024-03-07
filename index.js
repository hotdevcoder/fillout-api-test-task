require("dotenv").config();
const express = require("express");
const cors = require("cors");
const filteredResponsesRoute = require("./routers/filteredResponses.route");
const { server } = require("./config");

const app = express();
app.use(cors());
app.use("/", filteredResponsesRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(server.port, () => console.log(`Server running on port ${server.port}`));
