import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaCheck, 
  FaShieldAlt, 
  FaUserAlt, 
  FaLock, 
  FaExchangeAlt,
  FaHeadset,
  FaTags,
  FaBell,
  FaGlobe,
  FaChevronDown,
  FaArrowRight,
  FaSyncAlt,
  FaQuestionCircle
} from 'react-icons/fa';

export default function DomainRegister() {
  const [activeTab, setActiveTab] = useState('register');
  const [activeFaq, setActiveFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const domains = [
    { tld: '.com', price: '$12.99' },
    { tld: '.net', price: '$14.99' },
    { tld: '.org', price: '$10.99' },
    { tld: '.io', price: '$39.99' },
  ];

  const features1 = [
    {
      icon: <FaUserAlt className="text-[#3E38DA] text-xl" />,
      title: "Contact Management",
      description: "Easily manage registrant, admin, and technical contact details. Bulk updates supported."
    },
    {
      icon: <FaShieldAlt className="text-[#3E38DA] text-xl" />,
      title: "Always In Your Name",
      description: "Your domain is registered in your name, not ours no lock-in, no confusion."
    },
    {
      icon: <FaLock className="text-[#3E38DA] text-xl" />,
      title: "Free Privacy Protection",
      description: "WHOIS protection is included as standard, keeping your identity private at no extra charge."
    },
    {
      icon: <FaExchangeAlt className="text-[#3E38DA] text-xl" />,
      title: "Transfer Out Free of Charges",
      description: "Need to leave us? No problem. We make transfers out simple, with no hidden fees."
    }
  ];

  const features2 = [
    {
      icon: <FaHeadset className="text-[#3E38DA] text-xl" />,
      title: "24/7/365 Domain Name Support",
      description: "Chat, phone, or email — our expert support team is available (round-the-clock)."
    },
    {
      icon: <FaTags className="text-[#3E38DA] text-xl" />,
      title: "Transparent Renewal Pricing",
      description: "No surprises or hidden changes. Our pricing is flat, fair, and competitive."
    },
    {
      icon: <FaBell className="text-[#3E38DA] text-xl" />,
      title: "Domain Notification",
      description: "Never miss a renewal. Our dashboard sends timely reminders to keep you in control."
    },
    {
      icon: <FaGlobe className="text-[#3E38DA] text-xl" />,
      title: "Manage Multiple Domains",
      description: "Add and manage as many domains as your business needs — we're here to grow with you."
    }
  ];

  const faqs = [
    {
      question: "How to choose the best domain name?",
      answer: "Consider your brand, keep it short and memorable, avoid hyphens and numbers, and choose the right TLD."
    },
    {
      question: "What is domain name registration?",
      answer: "Domain registration is the process of reserving a name on the internet for a specified period, usually one year."
    },
    {
      question: "Can I register special domains like .gov?",
      answer: "Special domains like .gov have specific eligibility requirements and are typically reserved for government entities."
    },
    {
      question: "Why are some providers more expensive?",
      answer: "Pricing varies based on registrar services, included features, and business models."
    },
    {
      question: "Can I permanently buy a domain?",
      answer: "No, domains are registered for a period (usually 1-10 years) and must be renewed before expiration."
    },
    {
      question: "How does Belfor Host boost speed?",
      answer: "We use optimized DNS servers, global CDN integration, and advanced caching techniques for faster resolution."
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    
{/* Hero Section */}
<section className="py-16 px-4 bg-[#3E38DA] text-white">
  <div className="max-w-6xl mx-auto text-center">
    <motion.h1 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-3xl md:text-4xl font-bold mb-4"
    >
      Want the Perfect Domain Name?
    </motion.h1>
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="text-lg md:text-xl mb-8 max-w-3xl mx-auto"
    >
      The right domain can set your business apart. Secure your identity online with Balfor Host and build a trusted, memorable brand.
    </motion.p>
    
    {/* White background container for search elements */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6"
    >
      
      <div className="flex flex-col sm:flex-row items-stretch rounded-md overflow-hidden border border-gray-200">
        <input
          type="text"
          placeholder="Find your perfect domain..."
          className="flex-grow px-4 sm:px-6 py-4 text-gray-800 focus:outline-none text-base sm:text-lg border-0 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex mt-0 sm:mt-0 border-t sm:border-t-0 sm:border-l border-gray-200">
          <select className="px-3 sm:px-4 py-2 text-gray-700 focus:outline-none bg-[#D9D9D980] w-full sm:w-auto">
            <option>.com</option>
            <option>.net</option>
            <option>.org</option>
            <option>.io</option>
            <option>.co.ke</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#3E38DA] text-white px-4 sm:px-6 py-3 flex items-center justify-center font-medium border-0 w-full sm:w-auto"
          >
            <FaSearch className="mr-2" /> Search
          </motion.button>
        </div>
      </div>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="mt-8"
    >
      <p className="text-sm font-medium mb-2">Popular domains:</p>
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {domains.map((domain, index) => (
          <motion.span 
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + (index * 0.1) }}
            className="bg-white bg-opacity-20 px-3 py-1 rounded"
          >
            <span className="font-medium">{domain.tld}</span> 
            <span className="ml-1">{domain.price}</span>
            {index < domains.length - 1 && <span className="mx-2">|</span>}
          </motion.span>
        ))}
      </div>
    </motion.div>
  </div>
</section>
      {/* Transfer Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Already Have a Domain?</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Transfers are easy, affordable, and include renewal at no extra cost.
            </p>
            <div className="h-px bg-gray-300 my-8 max-w-md mx-auto"></div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#22C55E] text-white px-8 py-3 rounded-lg font-bold flex items-center justify-center mx-auto"
            >
              Transfer Now <FaArrowRight className="ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Cards Section - Full Width */}
      <section className="py-16 bg-[#DBEAFE80]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">What You Get with Belfor Host Domain Registration</h3>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6"
            >
              {features1.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      {feature.icon}
                    </div>
                    <h4 className="font-bold text-gray-800">{feature.title}</h4>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Full Width */}
      <section className="py-16 bg-[#DBEAFE80]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12"
          >
            What You Get with Belfor Host Domain Registration
          </motion.h2>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {features2.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-800">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
                <div className="h-px bg-gray-200 my-6"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <FaChevronDown 
                    className={`transform transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-white">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-600 mb-6">
              Free domains are not included with monthly billing and apply to selected TLDs only
              (.com, .net, .org, etc.). Premium domains are excluded. Contact us for details.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#3E38DA] text-white px-8 py-3 rounded-lg font-bold flex items-center justify-center mx-auto"
            >
              <FaSyncAlt className="mr-2" /> Transfer Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}