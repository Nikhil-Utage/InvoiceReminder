const express = require("express");
const axios = require("axios");
const { Invoice } = require("../db");
const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
}

router.post("/trigger", async (req, res) => {
  const invoice = await Invoice.findById(req.body.invoiceId);
  if (!invoice) {
    res.status(404).send("Invoice not found");
    return;
  }
  const dataToSend = {
    recipientEmail: invoice.email,
    recipientName: invoice.customerName,
    invoiceAmount: invoice.amount,
    dueDate: invoice.dueDate,
    invoiceId: invoice.invoiceId,
    subject: `Reminder: Invoice ${invoice.invoiceId} is Due`,
    body: `Dear ${invoice.customerName},\n\nThis is a reminder that your invoice with ID ${invoice.invoiceId} for $${invoice.amount} is due on ${invoice.dueDate}. Please make the payment at your earliest convenience.`,
  };
  axios
    .post("https://hooks.zapier.com/hooks/catch/21018784/2sqqoxp/", dataToSend)
    .then((respo) => {
      console.log(respo)
      res.status(200).send("Automation triggered");
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send("Error triggering automation");
    });
});

module.exports = router;
