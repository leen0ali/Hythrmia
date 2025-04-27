import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h4 className="footer-title">Hythrmia</h4>
          <p className="footer-description">
            Your Local Cyber Guardian for Smart Devices
          </p>
        </div>
        <div className="footer-right">
          <p>© {new Date().getFullYear()} Hythrmia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// Add the styles for the footer here
const footerStyles = `
  /* Ensure full height layout for the body and html */
  html, body {
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  /* Main content takes up the remaining space */
  .content {
    flex: 1;
  }

  /* Footer styles */
  .footer {
    background: linear-gradient(90deg, #1e0033, #0a0f2c);
    color: #e0e0e0;
    text-align: center;
    padding: 2rem 0;
    width: 100%;
    margin-top: auto; /* This ensures the footer stays at the bottom */
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-left {
    text-align: left;
  }

  .footer-title {
    font-size: 2rem;
    color: #ff0055;
    font-weight: bold;
  }

  .footer-description {
    font-size: 1.2rem;
    margin-top: 0.5rem;
  }

  .footer-right {
    text-align: right;
  }

  .footer-right p {
    font-size: 1rem;
  }
`;

const styleTag = document.createElement("style");
styleTag.innerHTML = footerStyles;
document.head.appendChild(styleTag);
