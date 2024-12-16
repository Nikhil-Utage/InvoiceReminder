import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import InvoiceList from './components/InvoiceList';
import CreateInvoice from './components/CreateInvoice';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="landing-page">
                <div className="landing-content">
                  <h1>Invoice Management System</h1>
                  <p>Streamline your invoice creation and tracking effortlessly.</p>
                  <div className="landing-buttons">
                    <Link to="/login" className="btn btn-primary">Login</Link>
                    <Link to="/invoices" className="btn btn-secondary">View Invoices</Link>
                  </div>
                </div>
              </div>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/invoices" element={<InvoiceList />} />
          <Route path="/create-invoice" element={<CreateInvoice />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;