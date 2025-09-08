import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram
} from 'react-icons/fa';

export default function Footer() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <footer className="bg-gray-900 text-white py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Brand Section - Left Side */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white">Belfor
               <span className="text-blue-500">Tech</span>
               </h2>
            <p className="text-gray-400 mt-2 text-sm">Transforming Industries through Innovative Technology</p>
            
            {/* Social Media Links with React Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaLinkedinIn className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Content Sections */}
          <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Contact & Support Section */}
            <div>
              <h3 
                className="text-lg font-semibold mb-4 flex justify-between items-center cursor-pointer md:cursor-auto"
                onClick={() => toggleSection('contact')}
              >
                Contact & Support
                <span className="md:hidden">
                  {activeSection === 'contact' ? '−' : '+'}
                </span>
              </h3>
              <div className={`${activeSection === 'contact' || activeSection === null ? 'block' : 'hidden'} md:block`}>
                <div className="mb-3">
                  <p className="font-medium text-gray-400">Nairobi, Kenya</p>
                  <p className="text-gray-400">+254 700 123 456</p>
                  <p className="text-gray-400">info@belfortech.co.ke</p>
                </div>
                <div className="mb-3">
                  <p className="font-medium text-gray-400">24/7 Support Available</p>
                </div>
                <button className="text-gray-400 hover:text-white font-medium transition-colors duration-300 text-sm">
                  Open Support Ticket
                </button>
              </div>
            </div>

            {/* Manage Your Account Section */}
            <div>
              <h3 
                className="text-lg font-semibold mb-4 flex justify-between items-center cursor-pointer md:cursor-auto"
                onClick={() => toggleSection('account')}
              >
                Manage Your Account
                <span className="md:hidden">
                  {activeSection === 'account' ? '−' : '+'}
                </span>
              </h3>
              <div className={`${activeSection === 'account' || activeSection === null ? 'block' : 'hidden'} md:block`}>
                <ul className="space-y-2">
                  <li className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    <Link to="/services">My Services</Link>
                  </li>
                  <li className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    <Link to="/invoices">View Invoices</Link>
                  </li>
                  <li className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    <Link to="/tickets">Open Ticket</Link>
                  </li>
                  <li className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    <Link to="/account">Update Account Info</Link>
                  </li>
                  <li className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    <Link to="/contacts">Add New Contact</Link>
                  </li>
                  <li className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    <Link to="/logout">Logout</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Services & Domains Section */}
            <div>
              <h3 
                className="text-lg font-semibold mb-4 flex justify-between items-center cursor-pointer md:cursor-auto"
                onClick={() => toggleSection('services')}
              >
                Services & Domains
                <span className="md:hidden">
                  {activeSection === 'services' ? '−' : '+'}
                </span>
              </h3>
              <div className={`${activeSection === 'services' || activeSection === null ? 'block' : 'hidden'} md:block`}>
                <ul className="space-y-2">
                  <li className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    <Link to="/hosting">Web Hosting Plans</Link>
                  </li>
                  <li className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    <Link to="/domains/register">Register a New Domain</Link>
                  </li>
                  <li className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    <Link to="/domains/transfer">Domain Transfer</Link>
                  </li>
                  <li className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    <Link to="/services/order">Order New Services</Link>
                  </li>
                  <li className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    <Link to="/domains">My Domains</Link>
                  </li>
                  <li className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    <Link to="/resources">Resources</Link>
                  </li>
                  <li className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    <Link to="/careers">Career Opportunities</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Certification Badges Section */}
            <div className="flex flex-col justify-center items-start md:items-center">
              <div className="flex flex-col space-y-4">
                <img 
                  src="/src/assets/images/cert.png" 
                  alt="Certification Badge 1" 
                  className="h-12"
                />
                <img 
                  src="/src/assets/images/protect.png" 
                  alt="Certification Badge 2" 
                  className="h-12"
                />
                <img 
                  src="/src/assets/images/third.png" 
                  alt="Certification Badge 3" 
                  className="h-12"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2025 Belfor Tech Consultants. All Rights Reserved.
              </p>
            </div>
            
            <div className="flex space-x-6 items-center">
              <Link to="/faq" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                FAQ
              </Link>
              <Link to="/blog" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                Blogs
              </Link>
              <Link to="/knowledge-base" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                Knowledge Base
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}