import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaPhoneAlt, FaEnvelope, FaUser, FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import companyLogo from '@assets/images/belfor.png';

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Hosting', path: '/hosting' },
    { name: 'Domains', path: '/domains' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Support', path: '/support' },
    { name: 'Account', path: '/account' }
  ];

  return (
    <div className="bg-[#3E38DA] text-white">
      <div className="bg-[#FF7B00] text-white">
        <div className="mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center border-b border-white/20">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <div className="flex items-center text-sm">
              <FaPhoneAlt className="mr-2" />
              <span>+254 700 123 456</span>
            </div>
            <div className="flex items-center text-sm">
              <FaEnvelope className="mr-2" />
              <span>support@belforhost.co.ke</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <Link to="/login" className="hover:text-white/90">Login</Link>
            <span className="text-white/50">|</span>
            <Link to="/signup" className="hover:text-white/90 flex items-center">
              Sign Up
              <FaShoppingCart className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      <nav className="sticky top-0 z-50 bg-[#3E38DA]">
        <div className="mx-auto px-0">
          <div className="flex justify-between items-center">
            <Link to="/" className="ml-0 pl-4">
              <img 
                src={companyLogo} 
                alt="Belfor Host" 
                className="h-20 md:h-[120px] w-auto"  
                style={{ 
                  minWidth: '180px', 
                  objectFit: 'contain'
                }}  
              />
            </Link>

            <div className="hidden md:flex items-center space-x-0">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `px-4 py-3 text-sm font-medium flex items-center ${
                      isActive ? 'bg-white/20' : 'hover:bg-white/10'
                    }`
                  }
                >
                  {item.icon && item.icon}
                  {item.name}
                </NavLink>
              ))}
            </div>

            <div className="md:hidden mr-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none"
              >
                {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden space-y-0">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `block px-4 py-3 text-sm font-medium flex items-center ${
                      isActive ? 'bg-white/20' : 'hover:bg-white/10'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon && item.icon}
                  <span className="ml-2">{item.name}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}