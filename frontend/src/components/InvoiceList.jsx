import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./InvoiceList.css";
import {
  FaUser,
  FaEnvelope,
  FaMoneyBillWave,
  FaClipboardList,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    axios
      .get("http://localhost:5000/invoices/due-invoices", {
        withCredentials: true,
      })
      .then((res) => setInvoices(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerAutomation = (invoiceId) => {
    axios
      .post(
        "http://localhost:5000/automation/trigger",
        { invoiceId },
        { withCredentials: true }
      )
      .then(() => alert("Automation triggered!"))
      .catch((err) => console.error(err));
  };

  const markAsSettled = (invoiceId) => {
    axios
      .post(
        `http://localhost:5000/invoices/settle/${invoiceId}`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        alert("Invoice marked as settled!");
        axios
          .get("http://localhost:5000/invoices/due-invoices", {
            withCredentials: true,
          })
          .then((res) => setInvoices(res.data))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="page-container">
      <header className="header">
        <h1 className="header-title">Invoice Management System</h1>
        <p className="header-clock">{time.toLocaleTimeString()}</p>
      </header>

      <div className="list-container">
        <h2 className="heading">Due Invoices</h2>
        <div className="link-container">
          <Link className="link" to="/create-invoice">
            Create New Invoice
          </Link>
        </div>
        <div className="invoices">
          {invoices.map((invoice) => (
            <div className="invoice-card" key={invoice._id}>
              <p className="invoice-id">
                <strong>Invoice ID:</strong> {invoice.invoiceId}
              </p>
              <p className="customer-name">
                <strong>Customer:</strong> {invoice.customerName}
              </p>
              <p className="amount">
                <strong>Amount:</strong> ₹{invoice.amount}
              </p>
              <p className="due-date">
                <strong>Due Date:</strong>{" "}
                {new Date(invoice.dueDate).toLocaleDateString()}
              </p>
              <div className="button-group">
                <button
                  className="button automation-button"
                  onClick={() => triggerAutomation(invoice._id)}
                >
                  Trigger Automation
                </button>
                <button
                  className="button settle-button"
                  onClick={() => markAsSettled(invoice._id)}
                  disabled={invoice.status === "settled"}
                >
                  {invoice.status === "settled" ? "Settled" : "Mark as Settled"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <div className="footer-text">
          © {new Date().getFullYear()} Invoice Management System | All Rights
          Reserved
        </div>
      </footer>
    </div>
  );
}

export default InvoiceList;
