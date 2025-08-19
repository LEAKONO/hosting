import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaSearch, 
  FaGlobe, 
  FaShieldAlt, 
  FaClock, 
  FaMoneyBillWave,
  FaCogs,
  FaHeadset,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

export default function DomainSearch() {
  const [domain, setDomain] = useState('');
  const [tld, setTld] = useState('.com');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
        duration: 0.8
      }
    },
    hover: {
      y: -5,
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        type: "spring",
        stiffness: 120,
        damping: 10
      }
    }),
    hover: {
      y: [0, -5, 0, -3, 0],
      transition: {
        duration: 1,
        repeat: Infinity
      }
    }
  };

  const faqVariants = {
    open: { 
      opacity: 1,
      height: "auto",
      transition: { 
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    },
    closed: { 
      opacity: 0,
      height: 0,
      transition: { 
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    }
  };

  // Intersection observer hooks
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [pricingRef, pricingInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [processRef, processInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [faqRef, faqInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const tlds = ['.com', '.co.ke', '.org', '.net', '.africa'];
  const popularDomains = [
    { tld: '.co.ke', price: 'KES 1,449/yr', desc: 'Best for local businesses' },
    { tld: '.com', price: 'KES 2,399/yr', desc: 'Globally recognized' },
    { tld: '.africa', price: 'KES 699/yr', desc: 'Continental pride' }
  ];

  const pricingData = [
    { extension: '.co.ke', registration: 'KES 1,449', renewal: 'KES 1,699', transfer: 'KES 1,799' },
    { extension: '.ne.ke', registration: 'KES 1,598', renewal: 'KES 1,699', transfer: 'KES 1,799' },
    { extension: '.me.ke', registration: 'KES 1,599', renewal: 'KES 1,699', transfer: 'KES 1,799' },
    { extension: '.info.ke', registration: 'KES 1,599', renewal: 'KES 1,699', transfer: 'KES 1,799' },
    { extension: '.org', registration: 'KES 1,099', renewal: 'KES 1,199', transfer: 'KES 1,199' },
    { extension: '.com', registration: 'KES 2,399', renewal: 'KES 2,469', transfer: 'KES 2,469' },
    { extension: '.net', registration: 'KES 1,099', renewal: 'KES 1,199', transfer: 'KES 1,199' },
    { extension: '.africa', registration: 'KES 699', renewal: 'KES 999', transfer: 'KES 999' },
    { extension: '.biz', registration: 'KES 2,299', renewal: 'KES 2,299', transfer: 'KES 2,299' },
    { extension: '.ke', registration: 'KES 3,499', renewal: 'KES 1,599', transfer: 'KES 1,699' }
  ];

  const faqs = [
    { 
      question: "What is a domain name?", 
      answer: "A domain name is your website's address on the internet that people type in the browser URL bar to visit your site." 
    },
    { 
      question: "Can I move my domain to Belfor Host?", 
      answer: "Yes, you can easily transfer your domain to Belfor Host. We provide free domain transfers with simple step-by-step instructions." 
    },
    { 
      question: "How fast is registration?", 
      answer: "Domain registration is instant after payment. Your domain will be active within seconds of completing your purchase." 
    },
    { 
      question: "How long does a domain registration last?", 
      answer: "Domains are registered for 1 year by default, with options to register for multiple years at discounted rates." 
    },
    { 
      question: "What is domain privacy protection?", 
      answer: "Domain privacy protection hides your personal contact information from public WHOIS databases, protecting you from spam and unwanted solicitations." 
    }
  ];

  const handleSearch = () => {
    setSearchPerformed(true);
    // In a real app, you would perform the domain search here
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section - Reduced size */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="bg-[#3E38DA] text-white py-16 md:py-24 px-4 sm:px-6 flex items-center justify-center min-h-[70vh]"
      >
        <div className="max-w-6xl mx-auto text-center px-4">
          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6"
          >
            Secure Your Digital Identity
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-xl mb-8 max-w-2xl mx-auto"
          >
            Find, register, and manage your perfect domain name with Belfor Host. Start your online journey today!
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-xl p-4 sm:p-6 max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mb-4">
              <div className="flex-1 flex flex-col sm:flex-row border-2 border-blue-500 rounded-lg overflow-hidden">
                <input
                  type="text"
                  className="flex-1 px-4 py-3 focus:outline-none border-0 bg-white text-gray-800 text-sm sm:text-base"
                  placeholder="Search for your perfect domain..."
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                />
                <select
                  className="px-4 py-3 bg-gray-50 sm:border-l-2 border-t-2 sm:border-t-0 border-blue-500 focus:outline-none text-gray-800 text-sm sm:text-base"
                  value={tld}
                  onChange={(e) => setTld(e.target.value)}
                >
                  {tlds.map((ext) => (
                    <option key={ext} value={ext}>
                      {ext}
                    </option>
                  ))}
                </select>
              </div>
              
              <motion.button
                className="bg-[rgb(76,0,255)] hover:bg-[#E56D00] text-white px-4 sm:px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium text-sm sm:text-base"
                onClick={handleSearch}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSearch /> Search
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-4 justify-center"
          >
            {['.com KES 3,999', '.co.ke KES 1,449', '.org KES 1,099', '.africa KES 1,099'].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white/10 px-3 py-1 sm:px-4 sm:py-2 rounded-full cursor-pointer text-sm sm:text-base"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Limited Time Offer Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-[#FFF3CD] px-4 py-3 text-center relative overflow-hidden"
      >
        <div className="absolute left-0 top-0 h-full w-2 bg-[#EAB308]"></div>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between pl-4 gap-2 sm:gap-0">
          <div className="flex items-center">
            <FaClock className="text-[#856404] mr-2" />
            <span className="text-[#856404] font-medium text-sm sm:text-base">
              Limited Time Offer: Register your domain for just KES 299 (Regular KES 990)
            </span>
          </div>
          <motion.button
            className="bg-[#EAB308] text-white px-3 sm:px-4 py-1 sm:py-2 rounded font-medium ml-0 sm:ml-4 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Claim Offer
          </motion.button>
        </div>
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.section 
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-12 sm:py-16 px-4 sm:px-6 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800"
          >
            Why Register with Belfor Host?
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl text-center mb-8 sm:mb-12 max-w-3xl mx-auto text-gray-600"
          >
            We provide everything you need to establish and grow your online presence with confidence.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: <FaClock size={28} className="sm:w-8 sm:h-8" />, color: "text-blue-600", title: "Instant Activation", desc: "Your domain is live within seconds of payment." },
              { icon: <FaMoneyBillWave size={28} className="sm:w-8 sm:h-8" />, color: "text-green-600", title: "Affordable Rates", desc: "Transparent, competitive pricing with no hidden costs." },
              { icon: <FaCogs size={28} className="sm:w-8 sm:h-8" />, color: "text-purple-600", title: "Free DNS Management", desc: "Take full control of your domain settings at any time." },
              { icon: <FaShieldAlt size={28} className="sm:w-8 sm:h-8" />, color: "text-red-600", title: "Privacy Protection", desc: "Shield your personal details from public view." },
              { icon: <FaHeadset size={28} className="sm:w-8 sm:h-8" />, color: "text-orange-600", title: "Local Support", desc: "Kenyan-based experts available 24/7 to assist you." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-gray-50 p-5 sm:p-6 rounded-lg shadow-md cursor-pointer border border-gray-200"
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`${feature.color} mb-3 sm:mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section 
        ref={pricingRef}
        initial="hidden"
        animate={pricingInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800"
          >
            Domain Pricing
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl text-center mb-8 sm:mb-12 max-w-3xl mx-auto text-gray-600"
          >
            Competitive pricing for all popular domain extensions
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 overflow-x-auto"
            whileHover={{ scale: 1.005 }}
          >
            <div className="min-w-[600px] sm:min-w-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#3E38DA]">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-100 uppercase tracking-wider">Extension</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-100 uppercase tracking-wider">Registration</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-100 uppercase tracking-wider">Renewal</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-100 uppercase tracking-wider">Transfer</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-100 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pricingData.map((item, index) => (
                    <motion.tr 
                      key={index}
                      whileHover={{ 
                        backgroundColor: "rgba(62, 56, 218, 0.05)",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <td className="px-4 sm:px-6 py-3 whitespace-nowrap font-bold text-gray-900 text-sm sm:text-base">{item.extension}</td>
                      <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-sm sm:text-base">{item.registration}</td>
                      <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-sm sm:text-base">{item.renewal}</td>
                      <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-sm sm:text-base">{item.transfer}</td>
                      <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                        <motion.button 
                          className="bg-[#3E38DA] text-white px-3 sm:px-4 py-1 sm:py-2 rounded font-medium text-xs sm:text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Register
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Process Section */}
      <motion.section 
        ref={processRef}
        initial="hidden"
        animate={processInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-12 sm:py-16 px-4 sm:px-6 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">How to Get Your Domain</h2>
              <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-600">
                Getting your perfect domain name is quick and easy with Belfor Host
              </p>
              
              <div className="space-y-4 sm:space-y-6">
                {[
                  { num: 1, title: "Search", desc: "Enter your desired domain name into our search bar." },
                  { num: 2, title: "Choose", desc: "Select from a wide variety of domain extensions." },
                  { num: 3, title: "Register", desc: "Complete your purchases through our secure system." },
                  { num: 4, title: "Go Live", desc: "Your website is ready in moments." }
                ].map((step, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-start bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mr-3 sm:mr-4 mt-1 flex-shrink-0 text-sm sm:text-base">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-gray-800">{step.title}</h3>
                      <p className="text-gray-600 text-sm sm:text-base">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Popular Choices in Kenya</h2>
              <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-600">
                These domain extensions are perfect for Kenyan businesses and individuals
              </p>
              
              <div className="space-y-4 sm:space-y-6">
                {popularDomains.map((domain, index) => (
                  <motion.div 
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow bg-gray-50"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0px 10px 20px rgba(0,0,0,0.1)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-gray-800">{domain.tld}</h3>
                    <p className="text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base">{domain.desc}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm sm:text-base">{domain.price}</span>
                      <motion.button 
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center text-sm sm:text-base"
                        whileHover={{ x: 5 }}
                      >
                        Register Now <span className="ml-1">→</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        ref={faqRef}
        initial="hidden"
        animate={faqInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800"
          >
            Domain Search FAQs
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl text-center mb-8 sm:mb-12 max-w-3xl mx-auto text-gray-600"
          >
            Answers to common questions about domain registration
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 max-w-3xl mx-auto border border-gray-200"
          >
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-0">
                <motion.button
                  className="w-full flex justify-between items-center py-3 sm:py-4 text-left"
                  onClick={() => toggleFaq(index)}
                  whileHover={{ x: 5 }}
                >
                  <h3 className="text-base sm:text-lg font-medium text-gray-800">{faq.question}</h3>
                  {expandedFaq === index ? (
                    <FaChevronUp className="text-[#3E38DA] transition-transform" />
                  ) : (
                    <FaChevronDown className="text-[#3E38DA] transition-transform" />
                  )}
                </motion.button>
                
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={faqVariants}
                      className="overflow-hidden"
                    >
                      <p className="pb-3 sm:pb-4 text-gray-600 text-sm sm:text-base">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section - Full width */}
      <motion.div 
        variants={itemVariants}
        className="w-full bg-[#3E38DA] text-white py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Ready to Claim Your Perfect Domain?</h3>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
            Start your online journey today with Belfor Host's reliable<br />
            domain registration services.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <motion.button 
              className="bg-white hover:bg-gray-100 text-[#3E38DA] px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Search Domains Now
            </motion.button>
            <motion.button 
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.15)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Support
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}