import React, { useState } from 'react';
import './ContactUs.scss';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BusinessIcon from '@mui/icons-material/Business';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

const ContactUs = () => {

  return (
    <div>
      <div className="contact-us">
        <div className='contact'><h2>Contact Us</h2></div>

        <div className="contactcards-container">
       
        <div className="card">
       
          <h3>
          If you have any questions or inquiries, feel free to reach out to us:

          </h3>

          <div className="contact-info">
         <div className='email'>
            <EmailIcon/> cybsure@cybage.com</div>
          <div className='phone'> <LocalPhoneIcon />+91 75950-77279 </div>
          <div className='address'> <BusinessIcon />CybSure, Brigade International Financial Centre, Gujarat International Finance Tec-City, Gandhinagar, Gujarat 382355</div>
        </div>
        </div>
        <div className="card">
        <div className='connect'>
        <h3>Let's connect</h3>
        <div className='socialSites'>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookIcon />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
            </a>
            {/* Add other icons with their respective links */}
            <a href="https://twitter.com/i/flow/login?lang=en" target="_blank" rel="noopener noreferrer">
                <XIcon />
            </a>
        </div>    

      </div>
      </div>
      </div>
       
      </div>
     

    </div>
  );
};

export default ContactUs;
