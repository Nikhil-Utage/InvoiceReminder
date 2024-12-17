import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './CreateInvoice.css';

const CreateInvoice = () => {
  const [customerName, setCustomerName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [email, setEmail] = useState('');
  const [invoiceId, setInvoiceId] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    const invoiceData = { customerName, amount, dueDate, email, invoiceId };
    try {
      const response = await fetch('http://localhost:5000/invoices/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData),
      });
      if (response.ok) {
        alert('Invoice created successfully!');
        navigate('/invoices'); // Redirect to /invoices page
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
        <div className="form-row">
          <div className="form-group">
            <label className="label" htmlFor="customerName">
              Customer Name:
            </label>
            <input
              className="input"
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="email">
              Email:
            </label>
            <input
              className="input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="label" htmlFor="amount">
              Amount:
            </label>
            <input
              className="input"
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="invoiceId">
              Invoice ID:
            </label>
            <input
              className="input"
              type="text"
              id="invoiceId"
              value={invoiceId}
              onChange={(e) => setInvoiceId(e.target.value)}
              placeholder="Enter invoice ID"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group full-width">
            <label className="label" htmlFor="dueDate">
              Due Date:
            </label>
            <input
              className="input"
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="Select due date"
            />
          </div>
        </div>
        <button className="button" type="submit">Create Invoice</button>
      </form>
    </div>
  );
};

export default CreateInvoice;
