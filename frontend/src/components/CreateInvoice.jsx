import React, { useState } from 'react';
import './CreateInvoice.css';

const CreateInvoice = () => {
  const [customerName, setCustomerName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const invoiceData = { customerName, amount, dueDate };
    try {
      const response = await fetch('http://localhost:5000/invoices/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData),
      });
      if (response.ok) {
        alert('Invoice created successfully!');
      } else {
        alert('Error creating invoice.');
      }
    } catch (error) {
      alert('Network error.');
    }
  };

  return (
    <div className="invoice-container">
      <h2 className="heading">Create Invoice</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          Customer Name:
          <input
            className="input"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </label>
        <label className="label">
          Amount:
          <input
            className="input"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label className="label">
          Due Date:
          <input
            className="input"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <button className="button" type="submit">Create Invoice</button>
      </form>
    </div>
  );
};

export default CreateInvoice;
