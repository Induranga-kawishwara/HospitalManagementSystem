import React from 'react';
import './footer.css'; // Make sure to create a corresponding CSS file for styling

const Footer = () => {
  return (
    <footer className="hospital-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Serene Summit</p>
          <p>123 Health Drive</p>
          <p>Colombo 01</p>
          <p>Phone: (011) 279-7979</p>
          <p>Email: info@serenesummit.com</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Medical Services</a></li>
            <li><a href="/appointments">Make an Appointment</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Use</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Hospital Name. All rights reserved.</p>
        <p>The information on this website is for general information purposes only. Nothing on this site should be taken as medical advice for any individual case or situation.</p>
      </div>
    </footer>
  );
}

export default Footer;
