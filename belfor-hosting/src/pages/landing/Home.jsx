import { useState, useEffect, useRef } from 'react';
import Hero from '../../components/landing/Hero';
import FeatureGrid from '../../components/landing/FeatureGrid';
import PricingCards from '../../components/landing/PricingCards';
import Testimonials from '../../components/landing/Testimonials';
import RegisterModal from '../../pages/auth/Register';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTicketAlt, FaComments, FaPhoneAlt, FaArrowRight, FaChevronDown, FaSearch, FaCheck, FaTimes } from 'react-icons/fa';
import mpesaImage from '../../assets/images/mpesagreen.png';
import mastercardImage from '../../assets/images/mastercard.png';
import visaImage from '../../assets/images/visa.png';
import transferImage from '../../assets/images/transfer.jpeg';

// DomainSearch Component
const DomainSearch = () => {
  const [domainQuery, setDomainQuery] = useState("");
  const [selectedExtension, setSelectedExtension] = useState(".com");
  const [domainResults, setDomainResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const extensions = [
    { ext: ".com", name: "com" },
    { ext: ".net", name: "net" },
    { ext: ".org", name: "org" },
    { ext: ".biz", name: "biz" },
    { ext: ".xyz", name: "xyz" },
    { ext: ".info", name: "info" },
    { ext: ".co.ke", name: "co.ke" },
    { ext: ".me", name: "me" },
    { ext: ".io", name: "io" },
    { ext: ".ai", name: "ai" },
  ];

  const popularExtensions = [".com", ".net", ".org", ".biz", ".xyz"];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDomainSearch = (e) => {
    e.preventDefault();
    if (!domainQuery.trim()) return;

    setIsSearching(true);
    setShowResults(true);

    setTimeout(() => {
      const results = extensions.map((item) => ({
        name: domainQuery + item.ext,
        available: Math.random() > 0.5, // Random availability
        price: Math.floor(Math.random() * 15) + 5, // Random price 5–20
      }));

      setDomainResults(results);
      setIsSearching(false);
    }, 1500);
  };

  const selectExtension = (ext) => {
    setSelectedExtension(ext);
    setShowDropdown(false);
  };

  return (
    <div
      className="bg-white py-6 px-6 shadow-lg rounded-lg max-w-4xl mx-auto relative z-20 -mb-16"
      style={{ marginTop: "2rem" }}
    >
      <form
        onSubmit={handleDomainSearch}
        className="flex flex-col md:flex-row gap-3 items-center"
      >
        <div className="relative flex-grow flex">
          <input
            type="text"
            value={domainQuery}
            onChange={(e) => setDomainQuery(e.target.value)}
            placeholder="YourDomain..."
            className="w-full py-4 px-6 rounded-l-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />

          {/* Extension Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="h-full py-4 px-4 border-y-2 border-r-2 border-gray-200 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-r-lg flex items-center text-gray-700 font-medium"
            >
              {selectedExtension}
              <FaChevronDown className="ml-2 text-sm" />
            </button>

            {showDropdown && (
              <div className="absolute left-0 right-0 z-10 mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                {extensions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => selectExtension(item.ext)}
                    className={`px-4 py-3 hover:bg-blue-50 cursor-pointer ${
                      selectedExtension === item.ext
                        ? "bg-blue-100 font-medium"
                        : ""
                    }`}
                  >
                    <span>{item.ext}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSearching}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-70 text-lg"
        >
          {isSearching ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 
                     5.373 0 12h4zm2 5.291A7.962 7.962 
                     0 014 12H0c0 3.042 1.135 5.824 
                     3 7.938l3-2.647z"
                ></path>
              </svg>
              Searching...
            </>
          ) : (
            <>
              <FaSearch className="mr-2" />
              Search
            </>
          )}
        </button>
      </form>

      {/* Popular Extensions */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {popularExtensions.map((ext, index) => (
          <span
            key={index}
            className="text-sm font-bold text-gray-800 hover:text-blue-600 cursor-pointer transition-colors"
            onClick={() => {
              setSelectedExtension(ext);
              setShowDropdown(false);
            }}
          >
            {ext}
          </span>
        ))}
      </div>

      {/* Domain Results */}
      {showResults && (
        <div className="mt-6 bg-gray-50 rounded-lg overflow-hidden shadow-md border border-gray-200">
          {isSearching ? (
            <div className="p-4 text-center text-gray-700">
              <p>Checking domain availability...</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {domainResults.map((domain, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 hover:bg-white transition-colors"
                >
                  <div className="flex items-center">
                    {domain.available ? (
                      <FaCheck className="text-green-500 mr-2" />
                    ) : (
                      <FaTimes className="text-red-500 mr-2" />
                    )}
                    <span className="font-medium">{domain.name}</span>
                  </div>
                  <div className="flex items-center">
                    {domain.available ? (
                      <>
                        <span className="text-green-600 font-bold">
                          ${domain.price}/year
                        </span>
                        <button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded">
                          Add to Cart
                        </button>
                      </>
                    ) : (
                      <span className="text-red-600">Unavailable</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};


// Enhanced Hero Component with Particles and Domain Search
const EnhancedHero = ({ onSignUp, onViewPlans }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particlesArray = [];
    let animationFrameId;

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 50;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2})`;
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.05 - 0.025;
        this.pulse = Math.random() * 0.5 + 0.5;
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
      }

      update() {
        this.angle += this.angleSpeed;
        this.pulse += this.pulseSpeed;
        this.x += this.speedX + Math.sin(this.angle) * 0.5;
        this.y += this.speedY + Math.cos(this.angle) * 0.5;

        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
      }

      draw() {
        const pulseSize = this.size * (0.8 + 0.2 * Math.sin(this.pulse));
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset blur after each draw
      }
    }

    const init = () => {
      particlesArray = [];
      const numberOfParticles = 60; // slightly reduced
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    const connectParticles = () => {
      const maxDistance = 100;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
<div className="relative overflow-visible bg-gradient-to-br from-blue-900 to-indigo-900 pb-36">
      {/* Animated background */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-indigo-900/30"></div>

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto pt-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Fastest Performance Web Hosting
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl mb-6 max-w-2xl mx-auto leading-relaxed"
        >
          Take your business online with Belfor Tech Consultants. <br />
          Lightning-fast hosting, free SSL, unlimited bandwidth, <br />
          and 24/7 expert support for Kenyan businesses.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base mb-8 font-medium"
        >
          Join 1M+ customers using Belfor Host.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onSignUp}
            className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 text-base"
          >
            Get Started
          </button>
          <button
            onClick={onViewPlans}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 text-base"
          >
            View Plans
          </button>
        </motion.div>
      </div>

      {/* Domain Search */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4">
        <DomainSearch />
      </div>
    </div>
  );
};

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Is Belfor Tech Hosting affordable for small businesses?",
      answers: [
        "Yes, we offer budget-friendly plans starting at just $2.99/month",
        "Special discounts available for annual billing",
        "30-day money-back guarantee on all plans",
      ],
    },
    {
      question: "Does Belfor Tech provide CMS support?",
      answers: [
        "Full support for WordPress, Joomla, and Drupal",
        "One-click installs for popular CMS platforms",
        "24/7 expert support for CMS-related issues",
      ],
    },
    {
      question: "Do I get a free SSL certificate?",
      answers: [
        "Free Let's Encrypt SSL with all hosting plans",
        "Auto-renewal included at no extra cost",
        "Premium SSL certificates available for e-commerce",
      ],
    },
    {
      question: "Is a free domain name included?",
      answers: [
        "Free domain for 1 year with annual plans",
        ".com, .net and .org domains included",
        "Easy domain management in your control panel",
      ],
    },
    {
      question: "Does Belfor Tech offer 24/7 support?",
      answers: [
        "24/7/365 support via phone, chat and email",
        "Average response time under 15 minutes",
        "Knowledge base with video tutorials",
      ],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="landing-page font-inter overflow-hidden">
      <EnhancedHero onSignUp={() => setShowRegisterModal(true)} />

      {/* Pricing Section */}
      <div className="pt-20">
        <PricingCards />
      </div>

      <FeatureGrid />
      <Testimonials />

      {/* Payment Options */}
      <div ref={sectionRef} className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-2xl font-extrabold text-gray-700 mb-8 text-center"
          >
            PAYMENT OPTIONS
          </motion.h1>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { img: mpesaImage, name: "Mpesa" },
              { img: mastercardImage, name: "Mastercard" },
              { img: visaImage, name: "Visa" },
              { img: transferImage, name: "Bank Transfer" },
            ].map((method, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="border border-blue-200 rounded-lg p-3 flex flex-col items-center hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={method.img}
                  alt={method.name}
                  className="h-12 mb-2 object-contain"
                />
                <span className="font-semibold text-sm">{method.name}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-gray-600 text-sm mt-4 text-center"
          >
            Pay securely via Paystack (multiple payment options available)
          </motion.p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h1 className="text-2xl font-extrabold mb-2">Frequently Asked Questions</h1>
            <p className="text-gray-600 mb-8">
              Find answers to common questions about our web hosting services.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-blue-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-left">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-blue-700 transition-transform ${
                      activeFaq === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-gray-50 border-t border-blue-200">
                        <ul className="list-disc pl-5 space-y-2">
                          {faq.answers.map((answer, i) => (
                            <li key={i} className="text-gray-700">
                              {answer}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl font-extrabold mb-8 text-center"
          >
            We're Here to Help You 24/7
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <FaTicketAlt className="text-white text-2xl mb-3" />,
                title: "Support Tickets",
                text: "Get dedicated support from our technical team",
                button: "Submit Ticket",
              },
              {
                icon: <FaComments className="text-white text-2xl mb-3" />,
                title: "Live Chat",
                text: "Chat with support now",
                button: "Chat With Us",
              },
              {
                icon: <FaPhoneAlt className="text-white text-2xl mb-3" />,
                title: "Call Us",
                text: "We are standing by! (6 AM - 10 PM)",
                phone: "+254768262704",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-20 transition-all duration-300 hover:scale-105"
              >
                {card.icon}
                <h2 className="font-bold text-lg mb-2">{card.title}</h2>
                <p className="mb-4 opacity-90">{card.text}</p>
                {card.button ? (
                  <button className="bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold flex items-center justify-center mx-auto hover:bg-blue-50 transition-colors">
                    {card.button} <FaArrowRight className="ml-2" />
                  </button>
                ) : (
                  <a
                    href={`tel:${card.phone}`}
                    className="text-white font-semibold hover:text-blue-200 transition-colors flex items-center justify-center"
                  >
                    {card.phone} <FaArrowRight className="ml-2" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-xl font-bold mb-2">
              Start your business with BelforTech today!
            </h2>
            <p className="opacity-90">
              Join over 1 million customers who trust Belfor Tech for their web hosting needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <button
              onClick={() => setShowRegisterModal(true)}
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
            >
              Get Started Now <FaArrowRight className="ml-2" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Register Modal */}
      <AnimatePresence>
        {showRegisterModal && (
          <RegisterModal
            onClose={() => setShowRegisterModal(false)}
            onSwitch={(mode) => {
              if (mode === "login") {
                setShowRegisterModal(false);
                // Open login modal if you have it
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}