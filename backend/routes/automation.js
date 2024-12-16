const express = require("express");
const axios = require("axios");
const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
}

router.post("/trigger", (req, res) => {
  axios
    .post("https://hooks.zapier.com/hooks/catch/21016401/2sg4b83/", {
      invoiceId: req.body.invoiceId,
    })
    .then(() => {
      res.status(200).send("Automation triggered");
    })
    .catch((err) => {   
      res.status(500).send("Error triggering automation");
    });
});

module.exports = router;
