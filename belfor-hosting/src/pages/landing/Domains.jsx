import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaLock,
  FaKey,
  FaShoppingCart,
  FaHeadset,
  FaUserShield,
  FaEyeSlash,
  FaExchangeAlt,
  FaClock,
  FaUnlock, 
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
} from "react-icons/fa";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const featureItemVariants = {
  rest: { 
    x: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  hover: {
    x: [0, 3, -3, 3, -3, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  }
};

const bounceItemVariants = {
  rest: { 
    y: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  hover: {
    y: -5,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15
    }
  }
};

const pulseItemVariants = {
  rest: { 
    scale: 1,
    transition: {
      duration: 0.3
    }
  },
  hover: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.6
    }
  }
};

const AnimatedSection = ({ children, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AnimatedItem = ({ children }) => {
  return (
    <motion.div variants={itemVariants}>
      {children}
    </motion.div>
  );
};

const ParallaxCard = ({ children, yRange = [0, 50] }) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false
  });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  );
};

export default function DomainTransfer() {
  const [openFaqs, setOpenFaqs] = useState({});

  const toggleFaq = (index) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqs = [
    {
      question: "Will my nameservers be changed on transfer?",
      answers: [
        "No, your nameservers will remain the same unless you choose to change them.",
        "We recommend checking your DNS settings after transfer to ensure everything is working correctly.",
        "You can update nameservers at any time through your control panel.",
      ],
    },
    {
      question: "Will my transfer take long?",
      answers: [
        "Most transfers complete within 5-7 days, depending on your current registrar.",
        "The speed can vary based on how quickly your current provider releases the domain.",
        "We'll notify you at each stage of the transfer process.",
      ],
    },
    {
      question: "Can you assist me with the transfer?",
      answers: [
        "Yes, our support team is available 24/7 to help with every step.",
        "We can guide you through unlocking your domain and obtaining the EPP code.",
        "For complex transfers, we offer a concierge transfer service.",
      ],
    },
    {
      question: "How does Apache Hosting improve load times?",
      answers: [
        "Our optimized Apache configuration includes caching and compression.",
        "We use the latest HTTP/2 protocol for faster content delivery.",
        "Our global CDN ensures quick loading from anywhere in the world.",
      ],
    },
    {
      question: "Are there limits to when I can transfer?",
      answers: [
        "Domains can't be transferred within 60 days of registration or previous transfer.",
        "The domain must be unlocked and not in redemption or pending delete status.",
        "Some country-code TLDs have additional restrictions.",
      ],
    },
    {
      question: "Can I track my transfer's progress?",
      answers: [
        "Yes, you'll receive email notifications at each stage.",
        "Your client area will show the current transfer status.",
        "Our support team can provide updates if needed.",
      ],
    },
    {
      question: "Can I renew my domain for more than 1 year during transfer?",
      answers: [
        "Yes, you can extend your registration for up to 10 years.",
        "Additional years will be added to your current expiration date.",
        "Multi-year renewals often come with discounts.",
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 overflow-x-hidden">
      {/* First Section - Transfer Process */}
      <AnimatePresence>
        <AnimatedSection className="mb-16">
          <div className="text-center mb-12">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Transfer Your Domain to Belfor Host
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Get up and running in no time with our fast, secure, and simple
              three-step transfer process.
            </motion.p>
          </div>

          {/* Domain Search with Features directly below */}
          <motion.div 
            className="max-w-2xl mx-auto mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search Your Domain..."
                className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button 
                className="absolute right-2 top-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </motion.button>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 md:gap-12 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {[
              { text: "24/7 Expert Support" },
              { text: "Fast Transfers" },
              { text: "No Hidden Risks" }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="flex items-center bg-white p-3 rounded-lg shadow-sm"
                variants={featureItemVariants}
                whileHover="hover"
              >
                <motion.div variants={pulseItemVariants}>
                  <FaCheckCircle className="text-[#16A34A] w-4 h-4 mr-2" />
                </motion.div>
                <p className="text-sm md:text-base">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Transfer Steps */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaUnlock />,
                title: "Unlock Your Domain",
                description: "Contact your current provider and unlock your domain. Once unlocked, we'll handle the rest and lock it again for your security after the transfer is complete."
              },
              {
                icon: <FaKey />,
                title: "Get EPP/Auth Code",
                description: "Request the EPP/Auth code from your provider and save it securely. You'll need it in the next step to transfer your domain to Belfor Host."
              },
              {
                icon: <FaShoppingCart />,
                title: "Place Your Order",
                description: "Go to our purchase section and add your domain as a 'transfer.' Once you complete payment, you'll be prompted to enter the EPP code in your client area."
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="text-blue-600 text-2xl mb-4">
                  <motion.div whileHover={{ rotate: 10 }}>
                    {step.icon}
                  </motion.div>
                </div>
                <h2 className="text-xl font-semibold mb-3">{step.title}</h2>
                <p className="text-gray-600 mb-4">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-8 text-center text-gray-600 bg-blue-50 p-4 rounded-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Transfers typically take 5 to 7 days. Most transfers include a 1-year
            domain renewal.
          </motion.div>
        </AnimatedSection>
      </AnimatePresence>

      {/* Second Section - Why Transfer */}
      <AnimatedSection className="mb-16 bg-gray-50 py-12 w-full">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Why Transfer to Belfor Host?
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: <FaHeadset />,
                title: "Expert Support",
                description: "Our domain experts are available 24/7 to guide you through every step."
              },
              {
                icon: <FaUserShield />,
                title: "Always In Your Name",
                description: "Your domain will always be registered under your name — no risk of loss or compromise."
              },
              {
                icon: <FaEyeSlash />,
                title: "Free Privacy Protection",
                description: "We include full WHOIS privacy protection to keep your domain ownership private."
              },
              {
                icon: <FaExchangeAlt />,
                title: "Transfer Out Free of Charge",
                description: "No stealthy transfer-out fees. We make switching providers simple and transparent."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="text-blue-600 text-2xl mb-4">
                  <motion.div whileHover={{ rotate: 10, scale: 1.1 }}>
                    {feature.icon}
                  </motion.div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection className="mb-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            className="flex flex-col items-center mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Frequently Asked Questions
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-center mb-8 mx-auto max-w-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Find answers to common questions about our web hosting services.
          </motion.p>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                className="border-b border-gray-200 pb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.button
                  className="w-full flex justify-between items-center text-left py-3"
                  onClick={() => toggleFaq(index)}
                  whileHover={{ color: "#3E38DA" }}
                >
                  <h3 className="text-lg font-medium">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openFaqs[index] ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openFaqs[index] ? (
                      <FaChevronUp className="text-gray-500" />
                    ) : (
                      <FaChevronDown className="text-gray-500" />
                    )}
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openFaqs[index] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="text-gray-600 pl-1 space-y-2 pb-2">
                        {faq.answers.map((answer, i) => (
                          <motion.p 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            {i + 1}. {answer}
                          </motion.p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Already Have a Domain Section */}
      <AnimatedSection className="flex flex-col items-center mb-16">
        <motion.h2 
          className="text-2xl font-semibold mb-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Already Have a Domain?
        </motion.h2>

        <motion.button 
          className="flex items-center justify-center border-2 border-[#3E38DA] rounded-[20px] bg-white hover:bg-gray-50 transition-all mb-8 px-8 py-4 md:px-12 md:py-6 text-lg font-medium"
          whileHover={{ scale: 1.05, backgroundColor: "#F5F5FF" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Transfer It to Belfor Host
        </motion.button>

        <motion.p 
          className="text-center max-w-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Transfers are easy, affordable, and include renewal at no extra cost.
        </motion.p>
      </AnimatedSection>
    </div>
  );
}