import React from "react";
import "./AboutUs.scss";

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="title">
        <h1>About Us</h1>
      </div>
      <div className="aboutcards-container">
        <div className="card">
          <h2>Our Mission</h2>
          <h3>
            We are an insurance providing company for the citizens of our
            Nation. We provide the best insurance available for a common man and
            within his resources so he can claim it without thinking twice.
          </h3>
        </div>
        <div className="card">
          <h2>Our History</h2>
          <h3>
            Our company was founded in 2019 and we are currently working with
            8000 employees and more than 10000 customers.
          </h3>
        </div>
      </div>
      <div className="location">
        <h2>Our Locations</h2>{" "}
      </div>
      <div className="map-container">
        <div className="map">
          <h3 style={{ textAlign: 'center', color: 'grey' }}>CybSure, Pune</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30260.788446204017!2d73.8596677780151!3d18.54703469916091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c11ae2bf451d%3A0x30c748dae5889df9!2sCybage%20Software!5e0!3m2!1sen!2sin!4v1713423472134!5m2!1sen!2sin"
        
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="map">
        <h3 style={{ textAlign: 'center', color: 'grey' }}>CybSure, Hyderabad</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30449.972681244133!2d78.3167041743164!3d17.447908000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93bc3d93a565%3A0x755607c3952d95c0!2sCybage%20Software%20Private%20Limited!5e0!3m2!1sen!2sin!4v1713424352805!5m2!1sen!2sin"
        
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="map">
        <h3 style={{ textAlign: 'center', color: 'grey' }}>CybSure, Gandhinagar</h3>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.1993392395743!2d72.67845977601087!3d23.162923611074707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e812167357b93%3A0x2f3655f7f4ecc197!2sBrigade%20International%20Financial%20Center!5e0!3m2!1sen!2sin!4v1713424452309!5m2!1sen!2sin"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
