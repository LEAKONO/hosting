import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  FaSearch, 
  FaCheck, 
  FaClock, 
  FaLock, 
  FaUserShield, 
  FaCertificate,
  FaGift,
  FaArrowRight,
  FaChevronDown
} from "react-icons/fa";

// Animation Variants
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
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

export default function DomainPricing() {
  const [searchTerm, setSearchTerm] = useState("");
  
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

  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const domains = [
    { extension: '.co.ke', register: 'KSh 1,449.00 / Year', transfer: 'KSh 1,799.00 / Year', renew: 'KSh 1,999.00 / Year', popular: false },
    { extension: '.ne.ke', register: 'KSh 1,599.00 / Year', transfer: 'KSh 1,799.00 / Year', renew: 'KSh 1,999.00 / Year', popular: false },
    { extension: '.me.ke', register: 'KSh 1,599.00 / Year', transfer: 'KSh 1,799.00 / Year', renew: 'KSh 1,999.00 / Year', popular: false },
    { extension: '.info.ke', register: 'KSh 1,599.00 / Year', transfer: 'KSh 1,799.00 / Year', renew: 'KSh 1,999.00 / Year', popular: false },
    { extension: '.or.ke', register: 'KSh 1,599.00 / Year', transfer: 'KSh 1,799.00 / Year', renew: 'KSh 1,999.00 / Year', popular: false },
    { extension: '.ac.ke', register: 'KSh 1,599.00 / Year', transfer: 'KSh 1,799.00 / Year', renew: 'KSh 1,999.00 / Year', popular: false },
    { extension: '.info', register: 'KSh 1,899.00 / Year', transfer: 'KSh 1,899.00 / Year', renew: 'KSh 1,899.00 / Year', popular: false },
    { extension: '.biz', register: 'KSh 2,299.00 / Year', transfer: 'KSh 2,299.00 / Year', renew: 'KSh 2,299.00 / Year', popular: false },
    { extension: '.com', register: 'KSh 2,399.00 / Year', transfer: 'KSh 2,399.00 / Year', renew: 'KSh 2,399.00 / Year', popular: false },
    { extension: '.ke', register: 'KSh 3,499.00 / Year', transfer: 'KSh 1,699.00 / Year', renew: 'KSh 1,599.00 / Year', popular: true },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-16 px-4 sm:px-6"
        style={{ backgroundColor: '#3E38DA' }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h1 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-6 text-white text-center"
          >
            Find Your Perfect Domain Name
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-blue-100 text-center"
          >
            Register your .com or .ke domain with free WHOIS privacy, instant setup, and expert support across Kenya
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="mt-8 max-w-2xl mx-auto bg-white rounded-lg p-4 sm:p-6 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="flex flex-grow rounded-lg overflow-hidden shadow-sm">
                <input
                  type="text"
                  placeholder="Search for your domain name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow px-4 py-3 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="relative flex-shrink-0">
                  <select className="appearance-none bg-gray-100 border border-gray-300 border-l-0 px-3 sm:px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-24 sm:w-28">
                    <option>.com</option>
                    <option>.co.ke</option>
                    <option>.org</option>
                    <option>.net</option>
                    <option>.info</option>
                    <option>.ke</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FaChevronDown className="text-sm" />
                  </div>
                </div>
              </div>
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-3 rounded-lg font-medium mt-2 sm:mt-0 sm:ml-2 flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-16 px-4 sm:px-6 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-4 text-gray-900"
          >
            Why Choose BelforTech?
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-center mb-12 text-gray-600 max-w-3xl mx-auto"
          >
            We provide the best domain registration services with premium features at competitive prices
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: <FaUserShield className="text-blue-600 text-2xl" />,
                title: "24/7 Support",
                desc: "Our expert team is available round the clock to assist you with any queries."
              },
              {
                icon: <FaClock className="text-blue-600 text-2xl" />,
                title: "99% Uptime Guarantee",
                desc: "Your website stays online with our industry-leading uptime guarantee."
              },
              {
                icon: <FaCertificate className="text-blue-600 text-2xl" />,
                title: "One-click SSL",
                desc: "Secure your website instantly with our one-click SSL certificate installation."
              },
              {
                icon: <FaGift className="text-blue-600 text-2xl" />,
                title: "Free Domain",
                desc: "Get a free domain name with select hosting plans to kickstart your online presence."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="p-6 rounded-lg text-left"
                style={{
                  background: "#DBEAFE",
                  boxShadow: "0px 5px 5px 0px #D9D9D980"
                }}
              >
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700">{feature.desc}</p>
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
        className="py-16 px-4 sm:px-6"
        style={{ backgroundColor: "#DBEAFE80" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-4 text-gray-900"
          >
            Domain Pricing
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-center mb-12 text-gray-600"
          >
            Competitive pricing for all popular domain extensions
          </motion.p>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-blue-600">
                    <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase">Domain</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase">New Price</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase">Transfer</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase">Renewal</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {domains.map((domain, index) => (
                    <motion.tr 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={domain.popular ? "bg-blue-50" : ""}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">{domain.extension}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{domain.register}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{domain.transfer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{domain.renew}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {domain.popular ? (
                          <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
                            Popular
                          </span>
                        ) : (
                          <span className="text-blue-600 font-medium">
                            Register
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden">
              {domains.map((domain, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 border-b border-gray-200 ${domain.popular ? "bg-blue-50" : ""}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{domain.extension}</span>
                    {domain.popular && (
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-gray-500">Registration</p>
                      <p className="text-gray-700 text-sm">{domain.register}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Transfer</p>
                      <p className="text-gray-700 text-sm">{domain.transfer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Renewal</p>
                      <p className="text-gray-700 text-sm">{domain.renew}</p>
                    </div>
                  </div>
                  {!domain.popular && (
                    <div className="mt-3">
                      <span className="text-blue-600 font-medium text-sm">Register</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section 
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-16 px-4 sm:px-6"
        style={{ backgroundColor: '#3E38DA' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold mb-4 text-white"
          >
            Start Your Business with BelforTech Today!
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl mb-8 text-blue-100"
          >
            Register your domain and get your website online with our reliable hosting solutions
          </motion.p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              className="bg-white hover:bg-gray-100 text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Register Domain
              <FaArrowRight />
            </motion.button>
            <motion.button
              className="bg-transparent hover:bg-blue-700 text-white border border-white px-6 sm:px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Hosting
              <FaArrowRight />
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}