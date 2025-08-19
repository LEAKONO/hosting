import React, { useRef, useState } from 'react';
import { FaArrowRight, FaCheck, FaGlobe, FaLock, FaShieldAlt, FaSearch, FaChartLine } from 'react-icons/fa';
import { MdEmail, MdStorage, MdPeople, MdBusiness } from 'react-icons/md';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { BsLightningFill } from 'react-icons/bs';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Import images
import productivitySuiteImage from '../../assets/images/productivity.png';
import sslCertificateImage from '../../assets/images/ssl.png';

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

// ✅ Fixed ParallaxCard with combined refs
const ParallaxCard = ({ children, yRange = [0, 50] }) => {
  const scrollRef = useRef(null);
  const [inViewRef] = useInView({
    threshold: 0.5,
    triggerOnce: false
  });

  const setRefs = (node) => {
    scrollRef.current = node;
    inViewRef(node);
  };

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <motion.div
      ref={setRefs}
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

const Pricing = () => {
  const [activeTab, setActiveTab] = React.useState('productivity');
  const [selectedSSL, setSelectedSSL] = React.useState(null);

  const productivityPlans = [
    {
      name: "Workplace Starter",
      price: "KES 6,720/year",
      features: [
        "2FA Security & Anti-Virus Protection",
        "Advanced Anti-Spam Filtering",
        "10 Aliases per Mailbox",
        "10 Forwarding Rules",
        "1 Mailbox (10GB Storage)",
        "Drive Cloud Storage",
        "Docs, Sheets, Presentations",
        "30-Day Free Trial"
      ]
    },
    {
      name: "Workplace Pro",
      price: "KES 12,500/year",
      features: [
        "Everything in Starter, plus:",
        "30 Aliases, 30 Forwarding Rules",
        "3 Mailboxes",
        "15GB Storage",
        "Full Collaboration Tools",
        "Drive Storage & Productivity Suite",
        "30-Day Free Trial"
      ]
    },
    {
      name: "Workplace Business",
      price: "KES 22,000/year",
      features: [
        "All Pro Features, plus:",
        "50 Aliases, 50 Forwarding Rules",
        "5 Mailboxes",
        "50GB Storage",
        "Advanced Business Email Tools",
        "Priority Support"
      ]
    }
  ];

  const sslPlans = [
    {
      name: "Basic DV SSL",
      price: "KES 750/year",
      features: [
        "Domain Validation",
        "Browser Padlock Enabled",
        "Fast Issuance"
      ]
    },
    {
      name: "Sectigo Positive SSL",
      price: "KES 1,500/year",
      features: [
        "Trusted by all browsers",
        "Free site seal",
        "DV Certificate"
      ]
    },
    {
      name: "Wildcard SSL",
      price: "KES 2,790/year",
      features: [
        "Protect unlimited subdomains",
        "Ideal for agencies and businesses",
        "Fast Issue and Install"
      ]
    },
    {
      name: "EV SSL",
      price: "KES 12,000/year",
      features: [
        "Extended Validation with company name",
        "Maximum trust and conversion",
        "Used by top banks and eCommerce sites"
      ]
    }
  ];
  return (
    <div className="font-sans text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <AnimatedSection className="bg-[#3E38DA] text-white py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-5 md:mb-0">
            <AnimatedItem>
              <motion.h1 
                className="text-2xl md:text-3xl font-bold mb-3"
                whileHover={{ scale: 1.02 }}
              >
                Business Productivity Suite
              </motion.h1>
            </AnimatedItem>
            <AnimatedItem>
              <motion.p className="text-base md:text-lg mb-3">
                Collaborate. Communicate. Succeed.
              </motion.p>
            </AnimatedItem>
            <AnimatedItem>
              <motion.p className="mb-5 text-sm md:text-sm leading-snug">
                Empower your startup or business with enterprise-grade email, 
                document collaboration, cloud storage, and productivity tools—all in one secure suite.
              </motion.p>
            </AnimatedItem>
            <AnimatedItem>
              <div className="flex space-x-3">
                <motion.button 
                  onClick={() => setActiveTab('productivity')}
                  className="bg-white text-[#3E38DA] px-4 py-2 text-sm rounded font-bold hover:bg-blue-50 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Plans
                </motion.button>
                <motion.button 
                  onClick={() => setActiveTab('ssl')}
                  className="border border-white px-4 py-2 text-sm rounded font-bold hover:bg-[#4a44e0] transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  SSL Certificates
                </motion.button>
              </div>
            </AnimatedItem>
          </div>
          <div className="md:w-1/2 flex justify-center mt-4 md:mt-0">
            <motion.img 
              src={productivitySuiteImage} 
              alt="Productivity Suite" 
              className="w-full max-w-[220px] md:max-w-[300px]"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              whileHover={{ 
                rotate: [0, 5, -5, 5, -5, 0],
                transition: { duration: 1 }
              }}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Perfect For Section */}
      <AnimatedSection className="max-w-6xl mx-auto py-12 px-4">
        <motion.h2 
          className="text-[28px] font-extrabold text-center mb-8"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            color: '#000000',
            lineHeight: '100%',
            letterSpacing: '0%'
          }}
          whileInView={{ scale: [0.95, 1], opacity: [0.8, 1] }}
          transition={{ duration: 0.5 }}
        >
          Perfect for:
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <MdPeople className="text-blue-600 text-3xl" />,
              title: "Remote teams",
              description: "Seamless collaboration across locations"
            },
            {
              icon: <MdEmail className="text-blue-600 text-3xl" />,
              title: "Professional communications",
              description: "Enterprise-grade email and messaging"
            },
            {
              icon: <HiOutlineDocumentText className="text-blue-600 text-3xl" />,
              title: "Secure document sharing",
              description: "Protected storage and transfer"
            },
            {
              icon: <MdBusiness className="text-blue-600 text-3xl" />,
              title: "SMEs and fast-growing startups",
              description: "Scalable solutions for growing businesses"
            }
          ].map((feature, index) => (
            <ParallaxCard key={index} yRange={[0, index % 2 === 0 ? 30 : 20]}>
              <motion.div 
                className="p-6 rounded-lg transition-all hover:shadow-xl h-full"
                style={{
                  background: '#DBEAFE',
                  boxShadow: '0px 5px 5px 0px rgba(217, 217, 217, 0.5)'
                }}
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="mb-4"
                  whileHover={{ rotate: 10 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            </ParallaxCard>
          ))}
        </div>
      </AnimatedSection>

      {/* Web Hosting Solutions Section */}
      <AnimatedSection className="w-full bg-[#EEEEEE] py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Web Hosting Solutions</h2>
            <p className="text-lg">Choose the perfect plan for your business needs</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {productivityPlans.map((plan, index) => (
              <ParallaxCard key={index} yRange={[0, index % 2 === 0 ? 40 : 30]}>
                <motion.div 
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition bg-white h-full"
                  variants={cardVariants}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0px 15px 20px rgba(0, 0, 0, 0.1)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className={`p-6 border-b ${
                    index === 1 
                      ? 'bg-orange-500 border-orange-500'
                      : 'bg-blue-600 border-blue-600'
                  }`}>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="text-white font-bold mt-2">{plan.price}</p>
                  </div>
                  
                  <div className="p-6">
                    {index === 1 && (
                      <motion.div 
                        className="bg-[#CA8A04] text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        POPULAR
                      </motion.div>
                    )}
                    
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 * i }}
                        >
                          <motion.div
                            variants={pulseItemVariants}
                            whileHover="hover"
                          >
                            <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          </motion.div>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <motion.button 
                      className={`mt-6 w-full py-3 rounded font-bold transition ${
                        index === 1 
                          ? 'bg-orange-500 hover:bg-orange-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Started
                    </motion.button>
                  </div>
                </motion.div>
              </ParallaxCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* SSL Certificates Section */}
      <AnimatedSection className="max-w-6xl mx-auto py-12 px-4 bg-white">
        <motion.div 
          className="w-full mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">SSL Certificates</h2>
          <motion.h3 
            className="text-xl mb-6" 
            style={{ color: '#FF7B00' }}
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.9, 1, 0.9]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2 
            }}
          >
            Secure Your Website. Build Customer Trust.
          </motion.h3>
          <div className="max-w-2xl mx-auto">
            <p className="mb-3">
              Whether you're running a small blog or a high-traffic eCommerce platform,
            </p>
            <p>
              SSL Certificates are essential for protecting your visitors and increasing your SEO rankings.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          <motion.div 
            className="md:w-1/2"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-blue-700">Benefits of SSL</h3>
            <div className="space-y-6">
              {[
                { icon: <FaLock className="text-blue-600 text-2xl" />, text: "Secure customer data & transactions" },
                { icon: <FaShieldAlt className="text-blue-600 text-2xl" />, text: "Enable HTTPS & browser padlock" },
                { icon: <FaSearch className="text-blue-600 text-2xl" />, text: "Improve SEO rankings" },
                { icon: <FaChartLine className="text-blue-600 text-2xl" />, text: "Boost visitor trust & conversion rates" }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center bg-blue-50 p-4 rounded-lg cursor-pointer group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{
                    x: [0, 3, -3, 3, -3, 0],
                    transition: { duration: 0.6 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div 
                    className="mr-4 bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition-colors"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    {item.icon}
                  </motion.div>
                  <motion.span 
                    className="font-medium"
                    whileHover={{ color: '#3E38DA' }}
                  >
                    {item.text}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="md:w-1/2 flex justify-center items-start"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img 
              src={sslCertificateImage} 
              alt="SSL Certificate" 
              className="w-full max-w-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Popular SSL Plans Section */}
      <AnimatedSection className="max-w-6xl mx-auto py-12 px-4 bg-white">
        <motion.h3 
          className="text-2xl font-bold mb-8 text-center"
          whileInView={{ 
            scale: [0.9, 1.03, 1],
            opacity: [0.6, 1]
          }}
          transition={{ duration: 0.5 }}
        >
          Popular SSL Plans
        </motion.h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sslPlans.map((plan, index) => (
            <ParallaxCard key={index} yRange={[0, index % 2 === 0 ? 30 : 20]}>
              <motion.div 
                className={`border rounded-lg p-6 ${selectedSSL === index ? 'border-blue-500' : 'border-gray-200'} cursor-pointer h-full`}
                style={{
                  background: '#DBEAFE',
                  boxShadow: '0px 5px 5px 0px rgba(217, 217, 217, 0.5)'
                }}
                onClick={() => setSelectedSSL(index)}
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.h4 
                  className="font-bold text-lg mb-2" 
                  style={{ color: '#3E38DA' }}
                  whileHover={{ scale: 1.02 }}
                >
                  {plan.name}
                </motion.h4>
                
                <motion.p 
                  className="font-bold mb-4" 
                  style={{ color: '#FF7B00' }}
                  animate={{ 
                    scale: [1, 1.03, 1],
                    transition: { repeat: Infinity, duration: 3 }
                  }}
                >
                  {plan.price}
                </motion.p>
                
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{
                        x: [0, 3, -3, 0],
                        transition: { duration: 0.4 }
                      }}
                    >
                      <motion.div
                        variants={pulseItemVariants}
                        whileHover="hover"
                      >
                        <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      </motion.div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.button 
                  className="w-full text-white py-2 rounded font-bold hover:opacity-90 transition"
                  style={{ background: '#3E38DA' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Buy Now
                </motion.button>
              </motion.div>
            </ParallaxCard>
          ))}
        </div>
      </AnimatedSection>

      {/* How to Get Your Domain and Popular Choices Section */}
      <AnimatedSection className="max-w-6xl mx-auto py-12 px-4 bg-white">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4">How to Get Your Domain</h3>
            <div className="space-y-4">
              {[
                "Multi-Domain SSL",
                "DV, EV & Wildcard options",
                "DigiCert, Sectigo, Thawte & GeoTrust brands",
                "Prices range from KES 750 – KES 32,750+"
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start bg-blue-50 p-3 rounded-lg cursor-pointer group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  variants={featureItemVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    variants={pulseItemVariants}
                    whileHover="hover"
                  >
                    <FaCheck className="text-blue-600 mt-1 mr-2 flex-shrink-0 group-hover:text-blue-700 transition-colors" />
                  </motion.div>
                  <motion.span
                    whileHover={{ color: '#3E38DA' }}
                  >
                    {item}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4">Popular Choices in Kenya</h3>
            <div className="space-y-4">
              {[
                "2048-bit encryption",
                "Unlimited reissues",
                "99.9% browser compatibility",
                "Free site seal",
                "24/7 Support"
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start bg-blue-50 p-3 rounded-lg cursor-pointer group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  variants={bounceItemVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    variants={pulseItemVariants}
                    whileHover="hover"
                  >
                    <FaCheck className="text-blue-600 mt-1 mr-2 flex-shrink-0 group-hover:text-blue-700 transition-colors" />
                  </motion.div>
                  <motion.span
                    whileHover={{ color: '#3E38DA' }}
                  >
                    {item}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="bg-[#3E38DA] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            whileInView={{ 
              scale: [0.95, 1.03, 1],
              opacity: [0.8, 1]
            }}
            transition={{ duration: 0.5 }}
          >
            Ready to Secure and Empower Your Business?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8"
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose from our comprehensive suite of productivity tools and security solutions 
            tailored for businesses of all sizes.
          </motion.p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.button 
              onClick={() => setActiveTab('productivity')}
              className="bg-white text-[#3E38DA] px-8 py-3 rounded font-bold hover:bg-blue-50 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Productivity Plans
            </motion.button>
            <motion.button 
              onClick={() => setActiveTab('ssl')}
              className="border border-white px-8 py-3 rounded font-bold hover:bg-[#4a44e0] transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore SSL Options
            </motion.button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Pricing;