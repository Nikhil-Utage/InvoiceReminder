import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './InvoiceList.css';

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/invoices/due-invoices', { withCredentials: true })
      .then((res) => setInvoices(res.data))
      .catch((err) => console.error(err));
  }, []);

  const triggerAutomation = (invoiceId) => {
    axios.post('http://localhost:5000/automation/trigger', { invoiceId }, { withCredentials: true })
      .then((res) => alert('Automation triggered!'))
      .catch((err) => console.error(err));
  };

  return (
    <div className="list-container">
      <h2 className="heading">Due Invoices</h2>
      <Link className="link" to="/create-invoice">Create New Invoice</Link>
      <div className="invoices">
        {invoices.map((invoice) => (
          <div className="invoice-card" key={invoice._id}>
            <p className="description">{invoice.description}</p>
            <p className="amount">${invoice.amount}</p>
            <button
              className="button"
              onClick={() => triggerAutomation(invoice._id)}
            >
              Trigger Automation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InvoiceList;
