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
  FaShieldAlt,
  FaTicketAlt
} from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import companyLogo from '@assets/images/belfor.png';
import LoginModal from "@pages/auth/Login";
import RegisterModal from "@pages/auth/Register";
import ForgotPasswordModal from "@pages/auth/ForgotPassword";

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

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
          name: 'SSL', 
          path: '/pricing/ssl', 
          icon: <FaLock className="text-blue-500 mr-2" />,
          description: 'Secure your website with SSL'
        }
      ]
    },
    { 
      name: 'Ticket', 
      path: '/ticket'
    }
  ];

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(prev => !prev);
  
  const handleDropdownHover = (name) => {
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      
      // Close dropdown when clicking outside
      if (activeDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, activeDropdown]);

  // Animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const dropdownVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  const handleAuthSwitch = (mode) => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setShowForgotModal(false);
    
    if (mode === 'login') setShowLoginModal(true);
    if (mode === 'register') setShowRegisterModal(true);
    if (mode === 'forgot') setShowForgotModal(true);
  };

  return (
    <>
      <div className={`bg-[#3E38DA] text-white sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
        {/* Top bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#FF7B00] text-white"
        >
          <div className="mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center border-b border-white/20">
            <div className="flex items-center space-x-4 mb-2 md:mb-0">
              <motion.div 
                className="hidden md:flex items-center text-sm"
                whileHover={{ scale: 1.05 }}
              >
                <FaPhoneAlt className="mr-2" />
                <span>+254 700 123 456</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center text-sm"
                whileHover={{ scale: 1.05 }}
              >
                <FaEnvelope className="mr-2" />
                <span className="hidden sm:inline">support@belforhost.co.ke</span>
                <span className="sm:hidden">support</span>
              </motion.div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <motion.div whileHover={{ scale: 1.05 }}>
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="hover:text-white/90"
                >
                  Login
                </button>
              </motion.div>
              <span className="text-white/50">|</span>
              <motion.div whileHover={{ scale: 1.05 }}>
                <button 
                  onClick={() => setShowRegisterModal(true)}
                  className="hover:text-white/90 flex items-center"
                >
                  Sign Up
                  <FaShoppingCart className="ml-2" />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <nav className="bg-[#3E38DA]">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-20">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/" className="h-32 w-32 block">
                  <img src={companyLogo} alt="Belfor Host" className="h-full w-full object-cover" />
                </Link>
              </motion.div>

              {/* Desktop Navigation - Right Aligned */}
              <div className="hidden lg:flex items-center justify-end flex-1">
                <div className="flex items-center space-x-1">
                  {navItems.map((item, index) => (
                    <motion.div 
                      key={item.path}
                      className="relative group"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onMouseEnter={() => item.dropdown && handleDropdownHover(item.name)}
                      onMouseLeave={handleDropdownLeave}
                      ref={dropdownRef}
                    >
                      {item.dropdown ? (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                              location.pathname.startsWith(item.path) ? 'bg-white/20' : 'hover:bg-white/10'
                            }`}
                          >
                            {item.name}
                            {activeDropdown === item.name ? (
                              <FaChevronUp className="ml-1" size={12} />
                            ) : (
                              <FaChevronDown className="ml-1" size={12} />
                            )}
                          </motion.button>
                          <AnimatePresence>
                            {activeDropdown === item.name && (
                              <motion.div
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={dropdownVariants}
                                className="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-50 p-4 border border-gray-200"
                                style={{ width: 'max-content', maxWidth: '600px' }}
                              >
                                <div className="flex flex-col space-y-3">
                                  {item.dropdown.map((dropdownItem) => (
                                    <motion.div
                                      key={dropdownItem.path}
                                      variants={itemVariants}
                                    >
                                      <NavLink
                                        to={dropdownItem.path}
                                        className={({ isActive }) => 
                                          `flex px-4 py-3 rounded-md transition-colors items-start ${
                                            isActive ? 'bg-blue-100' : 'hover:bg-blue-50'
                                          }`
                                        }
                                        onClick={() => setActiveDropdown(null)}
                                      >
                                        <div className="flex-shrink-0 mt-1">
                                          {dropdownItem.icon}
                                        </div>
                                        <div className="ml-3">
                                          <div className="font-medium text-gray-900 text-sm">
                                            {dropdownItem.name}
                                          </div>
                                          <div className="text-xs text-gray-500 mt-1">
                                            {dropdownItem.description}
                                          </div>
                                      </div>
                                      </NavLink>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <NavLink
                            to={item.path}
                            className={({ isActive }) => 
                              `px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                                isActive ? 'bg-white/20' : 'hover:bg-white/10'
                              }`
                            }
                          >
                            {item.name}
                          </NavLink>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMenu} 
                  className="text-white focus:outline-none p-2 rounded-md hover:bg-white/10" 
                  aria-label="Toggle menu"
                >
                  {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial="closed"
                animate="open"
                exit="closed"
                variants={mobileMenuVariants}
                className="lg:hidden fixed inset-0 top-0 bg-[#3E38DA] z-50 overflow-y-auto"
              >
                {/* Mobile menu header with close button */}
                <div className="flex justify-between items-center p-4 border-b border-white/20">
                  <Link to="/" className="h-20 w-20 block" onClick={closeMenu}>
                    <img src={companyLogo} alt="Belfor Host" className="h-full w-full object-cover" />
                  </Link>
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={closeMenu} 
                    className="text-white focus:outline-none p-2 rounded-md hover:bg-white/10" 
                    aria-label="Close menu"
                  >
                    <FaTimes size={24} />
                  </motion.button>
                </div>
                
                {/* Mobile contact info - visible only in mobile menu */}
                <div className="px-4 py-3 border-b border-white/20">
                  <div className="flex flex-col space-y-2 text-sm">
                    <div className="flex items-center">
                      <FaPhoneAlt className="mr-2" />
                      <span>+254 700 123 456</span>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="mr-2" />
                      <span>support@belforhost.co.ke</span>
                    </div>
                  </div>
                </div>
                
                <div className="container mx-auto px-4 py-2">
                  <div className="flex flex-col space-y-1">
                    {navItems.map((item, index) => (
                      <motion.div 
                        key={item.path}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.dropdown ? (
                          <>
                            <button
                              onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                              className={`block w-full text-left px-4 py-3 rounded-md text-lg font-medium flex items-center justify-between ${
                                location.pathname.startsWith(item.path) ? 'bg-white/20' : 'hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-center">
                                <span>{item.name}</span>
                              </div>
                              {activeDropdown === item.name ? (
                                <FaChevronUp size={14} />
                              ) : (
                                <FaChevronDown size={14} />
                              )}
                            </button>
                            <AnimatePresence>
                              {activeDropdown === item.name && (
                                <motion.div
                                  initial="closed"
                                  animate="open"
                                  exit="closed"
                                  variants={dropdownVariants}
                                  className="ml-6 mt-1 space-y-2"
                                >
                                  {item.dropdown.map((dropdownItem, dIndex) => (
                                    <motion.div
                                      key={dropdownItem.path}
                                      variants={itemVariants}
                                      transition={{ delay: dIndex * 0.1 }}
                                    >
                                      <NavLink
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
                                    </motion.div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
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
                            <span>{item.name}</span>
                          </NavLink>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Mobile auth buttons */}
                  <div className="mt-6 border-t border-white/20 pt-4">
                    <div className="flex flex-col space-y-3">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          closeMenu();
                          setShowLoginModal(true);
                        }}
                        className="bg-white text-blue-700 py-3 px-4 rounded-md font-medium text-center"
                      >
                        Login
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          closeMenu();
                          setShowRegisterModal(true);
                        }}
                        className="bg-[#FF7B00] text-white py-3 px-4 rounded-md font-medium text-center flex items-center justify-center"
                      >
                        Sign Up <FaShoppingCart className="ml-2" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Auth Modals */}
      <AnimatePresence>
        {showLoginModal && (
          <LoginModal 
            onClose={() => setShowLoginModal(false)} 
            onSwitch={handleAuthSwitch}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRegisterModal && (
          <RegisterModal 
            onClose={() => setShowRegisterModal(false)} 
            onSwitch={handleAuthSwitch}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForgotModal && (
          <ForgotPasswordModal 
            onClose={() => setShowForgotModal(false)} 
            onSwitch={handleAuthSwitch}
          />
        )}
      </AnimatePresence>
    </>
  );
}