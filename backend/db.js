const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://adityabansal22cse:Aditya11@bookfair.vggamhp.mongodb.net/ZapierProject"
);

const invoiceSchema = new mongoose.Schema({
  description: {type: String, default: "No description"},
  email: {type: String, required: true},
  amount: Number,
  dueDate: Date,
  customerName: String,
  invoiceId: {type: String, required: true},
  status: { type: String, default: "due" },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

async function getDueInvoices() {
  const today = new Date();
  return await Invoice.find({ dueDate: { $gte: today }, status: 'due' });
  // const invoices = await Invoice.find({ dueDate: { $lte: today }, status: 'due' });
  // console.log('Found invoices:', invoices);
  // return invoices;
}

async function createInvoice(invoiceData) {
  try{
    invoiceData.dueDate = new Date(invoiceData.dueDate);
    const invoice = new Invoice(invoiceData);
    return await invoice.save();
  }catch(err){
    console.log(err.message);
    return;
  }
}

async function settleInvoice(invoiceId) {
    try {
      console.log("Hello")
        const result = await Invoice.updateOne(
            { _id: invoiceId },
            { $set: { status: 'settled' } }
        );
        return true;
    } catch (error) {
        console.error('Error settling invoice:', error);
        throw error;
    }
}

module.exports = {  getDueInvoices,
  createInvoice,
  settleInvoice,
  Invoice
};
