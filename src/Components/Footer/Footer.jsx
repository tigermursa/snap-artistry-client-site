import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-base-200 text-base-content">
        <div>
          <img
            className="w-16 rounded-full"
            src="https://e0.pxfuel.com/wallpapers/590/423/desktop-wallpaper-lens-transparent-background-camera-lens-logo-design-png.jpg"
            alt="Snap Artistry Logo"
          />
          <p>
            Snap Artistry
            <br />
            Capturing moments since 20XX
          </p>
        </div>
        <div>
          <span className="footer-title">Contact</span>
          <a className="link link-hover">
            <FiMail className="inline mr-1" /> snapartistry@support.com
          </a>
          <a className="link link-hover">
            <FiPhone className="inline mr-1" /> +1 123-456-7890
          </a>
          <a className="link link-hover">
            <FiMapPin className="inline mr-1" /> 12/7A Street, New York, USA
          </a>
        </div>
        <div>
          <span className="footer-title">Social Media</span>
          <a className="link link-hover" href="https://facebook.com">
            <FaFacebook className="inline mr-1" /> Facebook
          </a>
          <a className="link link-hover" href="https://instagram.com">
            <FaInstagram className="inline mr-1" /> Instagram
          </a>
          <a className="link link-hover" href="https://youtube.com">
            <FaYoutube className="inline mr-1" /> YouTube
          </a>
          <a className="link link-hover" href="https://twitter.com">
            <FaTwitter className="inline mr-1" /> Twitter
          </a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of Service</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Cookie Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
