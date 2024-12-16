const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://adityabansal22cse:Aditya11@bookfair.vggamhp.mongodb.net/ZapierProject"
);

const invoiceSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  dueDate: Date,
  recipient: String,
  status: { type: String, default: "due" },
});

// Create the invoice model
const Invoice = mongoose.model("Invoice", invoiceSchema);

// Function to get due invoices
async function getDueInvoices() {
  const today = new Date();
  return await Invoice.find({ dueDate: { $gte: today }, status: 'due' });
  const invoices = await Invoice.find({ dueDate: { $lte: today }, status: 'due' });
  console.log('Found invoices:', invoices);
  return invoices;
}

async function createInvoice(invoiceData) {
  const invoice = new Invoice(invoiceData);
  return await invoice.save();
}

module.exports = {  getDueInvoices,
  createInvoice,
};
