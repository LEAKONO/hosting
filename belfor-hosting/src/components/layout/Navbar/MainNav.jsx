import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  FaBars, 
  FaTimes, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaShoppingCart, 
  FaChevronDown, 
  FaChevronUp,
  FaServer,
  FaGlobe,
  FaEnvelopeOpenText,
  FaLock,
  FaSearch,
  FaExchangeAlt,
  FaTags,
  FaDesktop,
  FaMailBulk,
  FaShieldAlt
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import companyLogo from '@assets/images/belfor.png';

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const navItems = [
    { 
      name: 'Hosting', 
      path: '/hosting',
      dropdown: [
        { 
          name: 'Web Hosting', 
          path: '/hosting', 
          icon: <FaServer className="text-blue-500 mr-2" />,
          description: 'Powerful hosting with 99.9% uptime guarantee'
        },
        { 
          name: 'Domain Search', 
          path: '/domain-search', 
          icon: <FaSearch className="text-blue-500 mr-2" />,
          description: 'Find your perfect domain name'
        },
        { 
          name: 'cPanel Hosting', 
          path: '/hosting/cpanel', 
          icon: <FaDesktop className="text-blue-500 mr-2" />,
          description: 'Easy-to-use control panel for your website'
        }
      ]
    },
    { 
      name: 'Domains', 
      path: '/domains',
      dropdown: [
        { 
          name: 'Register Domain', 
          path: '/domains/register', 
          icon: <FaGlobe className="text-blue-500 mr-2" />,
          description: 'Find and register your perfect domain'
        },
        { 
          name: 'Transfer Domains', 
          path: '/domains/transfer', 
          icon: <FaExchangeAlt className="text-blue-500 mr-2" />,
          description: 'Transfer your domains to us easily'
        },
        { 
          name: 'Domain Pricing', 
          path: '/domains/pricing', 
          icon: <FaTags className="text-blue-500 mr-2" />,
          description: 'Competitive pricing for all TLDs'
        }
      ]
    },
    { 
      name: 'Pricing', 
      path: '/pricing',
      dropdown: [
        { 
          name: 'Web Hosting', 
          path: '/hosting', 
          icon: <FaServer className="text-blue-500 mr-2" />,
          description: 'Affordable plans for all needs'
        },
        { 
          name: 'Workplace Emails', 
          path: '/pricing/emails', 
          icon: <FaMailBulk className="text-blue-500 mr-2" />,
          description: 'Professional email solutions'
        },
        { 
          name: 'SSL Certificates', 
          path: '/pricing/ssl', 
          icon: <FaLock className="text-blue-500 mr-2" />,
          description: 'Secure your website with SSL'
        }
      ]
    },
    { 
      name: 'Support', 
      path: '/support',
    },
    { 
      name: 'Account', 
      path: '/account',
    }
  ];

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(prev => !prev);
  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // Close dropdowns when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.querySelector('nav');
      if (isOpen && nav && !nav.contains(event.target)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="bg-[#3E38DA] text-white relative z-50">
      {/* Top bar */}
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

      <nav className="sticky top-0 bg-[#3E38DA]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="h-32 w-32">
              <img src={companyLogo} alt="Belfor Host" className="h-full w-full object-cover" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.path} className="relative group">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                          location.pathname.startsWith(item.path) ? 'bg-white/20' : 'hover:bg-white/10'
                        }`}
                      >
                        {item.icon}
                        {item.name}
                        {activeDropdown === item.name ? (
                          <FaChevronUp className="ml-1" size={12} />
                        ) : (
                          <FaChevronDown className="ml-1" size={12} />
                        )}
                      </button>
                      {activeDropdown === item.name && (
                        <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 p-2">
                          {item.dropdown.map((dropdownItem) => (
                            <NavLink
                              key={dropdownItem.path}
                              to={dropdownItem.path}
                              className={({ isActive }) => 
                                `block px-4 py-3 rounded-md transition-colors ${
                                  isActive ? 'bg-blue-100' : 'hover:bg-blue-50'
                                }`
                              }
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="flex items-start">
                                <div className="mt-1">{dropdownItem.icon}</div>
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {dropdownItem.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {dropdownItem.description}
                                  </div>
                                </div>
                              </div>
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => 
                        `px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                          isActive ? 'bg-white/20' : 'hover:bg-white/10'
                        }`
                      }
                    >
                      {item.icon}
                      {item.name}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMenu} 
                className="text-white focus:outline-none" 
                aria-label="Toggle menu"
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 top-20 bg-[#3E38DA] z-50 overflow-y-auto">
            <div className="container mx-auto px-4 py-2">
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <div key={item.path}>
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className={`block w-full text-left px-4 py-3 rounded-md text-lg font-medium flex items-center justify-between ${
                            location.pathname.startsWith(item.path) ? 'bg-white/20' : 'hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center">
                            {item.icon}
                            <span className="ml-2">{item.name}</span>
                          </div>
                          {activeDropdown === item.name ? (
                            <FaChevronUp size={14} />
                          ) : (
                            <FaChevronDown size={14} />
                          )}
                        </button>
                        {activeDropdown === item.name && (
                          <div className="ml-6 mt-1 space-y-2">
                            {item.dropdown.map((dropdownItem) => (
                              <NavLink
                                key={dropdownItem.path}
                                to={dropdownItem.path}
                                className={({ isActive }) => 
                                  `block px-4 py-3 rounded-md text-base flex items-start ${
                                    isActive ? 'bg-white/20' : 'hover:bg-white/10'
                                  }`
                                }
                                onClick={closeMenu}
                              >
                                <div className="mt-1">{dropdownItem.icon}</div>
                                <div className="ml-2">
                                  <div>{dropdownItem.name}</div>
                                  <div className="text-xs text-white/80">
                                    {dropdownItem.description}
                                  </div>
                                </div>
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => 
                          `block px-4 py-3 rounded-md text-lg font-medium flex items-center ${
                            isActive ? 'bg-white/20' : 'hover:bg-white/10'
                          }`
                        }
                        onClick={closeMenu}
                      >
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                      </NavLink>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}