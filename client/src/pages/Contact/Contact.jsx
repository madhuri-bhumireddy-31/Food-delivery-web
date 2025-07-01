// Contact.jsx (React Component)

import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div>
      <div className="contact-wrapper">
        <div className="contact-card">
          <h2 className="contact-title">Get In Touch</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input type="text" name="First Name" placeholder="First Name" required />
              <input type="text" name="Second Name" placeholder="Last Name" required />
            </div>
            <div className="form-row">
              <input type="email" name="Email" placeholder="Email" required />
              <input type="tel" name="Phone Number" placeholder="Phone" required />
            </div>
            <input type="text" name="Adress" placeholder="Address" required />
            <textarea name="Adress" placeholder="Type your message here" rows="4" required></textarea>
            <button name="submit" type="submit">Submit</button>

            {submitted && <p className="thank-you">Thanks for submitting!</p>}
          </form>
        </div>
      </div>

      <div className="container contact-location">
        <h3 className="find-us">Find Us on Google </h3>
        <div className="contact-map">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.600242267416!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670a6cf6df1%3A0xf245e75ff64f1b34!2sBangalore!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
            width="100%"
            height="350"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;

