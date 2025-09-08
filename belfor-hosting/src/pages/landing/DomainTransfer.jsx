import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  FaSearch, 
  FaArrowRight, 
  FaCheck, 
  FaLock, 
  FaUserShield, 
  FaEyeSlash,
  FaSyncAlt,
  FaClock,
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp
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

export default function DomainTransfer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Intersection observer hooks
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [processRef, processInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [benefitsRef, benefitsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [faqRef, faqInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    { 
      question: "Will my nameservers be changed on transfer?", 
      answer: "No, your nameservers will remain unchanged during the transfer process unless you choose to modify them." 
    },
    { 
      question: "Will my transfer take long?", 
      answer: "Transfers typically take 5 to 7 days to complete, as this process involves verification steps with your current registrar." 
    },
    { 
      question: "Can you assist me with the transfer?", 
      answer: "Yes, our domain experts are available 24/7 to guide you through every step of the transfer process." 
    },
    { 
      question: "How does Apache Hosting improve load times?", 
      answer: "Our optimized Apache configuration with caching mechanisms significantly improves website loading times." 
    },
    { 
      question: "Are there limits to when I can transfer?", 
      answer: "Domains cannot be transferred within 60 days of registration or previous transfer, or if they are in redemption period." 
    },
    { 
      question: "Can I track my transfer's progress?", 
      answer: "Yes, you can track the status of your domain transfer in real-time through your client area dashboard." 
    },
    { 
      question: "Can I renew my domain for more than 1 year during transfer?", 
      answer: "Yes, you can renew your domain for up to 10 years during the transfer process." 
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      
<motion.section 
  ref={heroRef}
  initial="hidden"
  animate={heroInView ? "visible" : "hidden"}
  variants={containerVariants}
  className="py-16 px-6"
  style={{ backgroundColor: '#3E38DA' }}
>
  <div className="max-w-6xl mx-auto">
    <motion.h1 
      variants={itemVariants}
      className="text-3xl md:text-4xl font-bold mb-6 text-white text-center"
    >
      Transfer Your Domain to Belfor Host
    </motion.h1>
    <motion.p 
      variants={itemVariants}
      className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-blue-100 text-center"
    >
      Get up and running in no time with our fast, secure, and simple three-step transfer process.
    </motion.p>
    
    <motion.div 
      variants={itemVariants}
      className="mt-8 max-w-2xl mx-auto bg-white rounded-lg p-6 shadow-lg"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Search Your Domain</h2>
      <p className="text-gray-600 mb-4 text-center">Enter your domain name below to begin.</p>
      
      <div className="flex flex-col sm:flex-row">
        <input
          type="text"
          placeholder="example.com"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-6 py-3 border border-gray-300 rounded-l-lg sm:rounded-r-none rounded-r-lg sm:rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <motion.button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg sm:rounded-l-none rounded-l-lg sm:rounded-r-lg font-medium mt-2 sm:mt-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Search
        </motion.button>
      </div>
    </motion.div>
    
    <motion.div 
      variants={itemVariants}
      className="mt-6 flex flex-wrap justify-center gap-6 text-blue-100"
    >
      <div className="flex items-center gap-2">
        <FaUserShield className="text-white" />
        <span>24/7 Expert Support</span>
      </div>
      <div className="flex items-center gap-2">
        <FaSyncAlt className="text-white" />
        <span>Fast Transfers</span>
      </div>
      <div className="flex items-center gap-2">
        <FaLock className="text-white" />
        <span>No Hidden Risks</span>
      </div>
    </motion.div>
  </div>
</motion.section>

      <motion.section 
        ref={processRef}
        initial="hidden"
        animate={processInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-16 px-6 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-12 text-gray-900"
          >
            How to Transfer Your Domain
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                step: "1",
                title: "Unlock Your Domain",
                description: "Contact your current provider and unlock your domain. Once unlocked, we'll handle the rest and lock it again for your security after the transfer is complete.",
                icon: <FaLock className="text-blue-600 text-2xl" />
              },
              {
                step: "2",
                title: "Get Your EPP/Auth Code",
                description: "Request the EPP/Auth code from your provider and save it securely. You'll need it in the next step to transfer your domain to Belfor Host.",
                icon: <FaUserShield className="text-blue-600 text-2xl" />
              },
              {
                step: "3",
                title: "Place Your Order",
                description: "Go to our purchase section and add your domain as a 'transfer'. Once you complete payment, you'll be prompted to enter the EPP code in your client area.",
                icon: <FaSyncAlt className="text-blue-600 text-2xl" />
              }
            ].map((item, i) => (
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
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold mr-4">
                    {item.step}
                  </div>
                  <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            variants={itemVariants}
            className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded"
          >
            <p className="text-yellow-700">
              <span className="font-bold">Note:</span> Transfers typically take 5 to 7 days. Most transfers include a 1-year domain renewal.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        ref={benefitsRef}
        initial="hidden"
        animate={benefitsInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-16 px-6"
        style={{ backgroundColor: "#DBEAFE80" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-12 text-gray-900"
          >
            Why Transfer to Belfor Host?
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <FaUserShield className="text-blue-600 text-2xl" />,
                title: "Expert Support",
                description: "Our domain experts are available 24/7 to guide you through every step."
              },
              {
                icon: <FaLock className="text-blue-600 text-2xl" />,
                title: "Always in Your Name",
                description: "Your domain will always be registered under your name no risk of loss or compromise."
              },
              {
                icon: <FaEyeSlash className="text-blue-600 text-2xl" />,
                title: "Free Privacy Protection",
                description: "We include full WHOIS privacy protection to keep your domain ownership private."
              },
              {
                icon: <FaSyncAlt className="text-blue-600 text-2xl" />,
                title: "Transfer Out Free of Charges",
                description: "No stealthy transfer-out fees. We make switching providers simple and transparent."
              }
            ].map((benefit, i) => (
              <motion.div 
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                </div>
                <p className="text-gray-700">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        ref={faqRef}
        initial="hidden"
        animate={faqInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-16 px-6 bg-white"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-12 text-gray-900"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              >
                <motion.button
                  className="w-full flex justify-between items-center p-6 text-left"
                  onClick={() => toggleFaq(index)}
                  whileHover={{ x: 5 }}
                >
                  <h3 className="font-bold text-gray-900 text-lg">{faq.question}</h3>
                  {activeFaq === index ? (
                    <FaChevronUp className="text-blue-600" />
                  ) : (
                    <FaChevronDown className="text-blue-600" />
                  )}
                </motion.button>
                
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={faqVariants}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 text-gray-700">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section - Screenshot 5 */}
      <motion.section 
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-16 px-6"
        style={{ backgroundColor: '#3E38DA' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold mb-4 text-white"
          >
            Ready to Transfer Your Domain?
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl mb-8 text-blue-100"
          >
            Join thousands of satisfied customers who trust Belfor Host with their domains.
          </motion.p>
          <motion.button
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-medium text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Transfer Now
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}