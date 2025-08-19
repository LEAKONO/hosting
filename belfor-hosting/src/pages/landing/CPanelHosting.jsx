import { motion } from "framer-motion";
import { 
  FaCheck, 
  FaChevronRight, 
  FaDatabase, 
  FaFileUpload, 
  FaShieldAlt, 
  FaChartLine, 
  FaEnvelope, 
  FaWordpress,
  FaGlobe,
  FaEnvelopeOpenText,
  FaLock,
  FaHistory,
  FaRocket,
  FaCode
} from "react-icons/fa";

export default function CPanelHosting() {
  const plans = [
    {
      name: "Starter Hosting",
      price: "Ksh 149.00",
      features: [
        "5GB SSD",
        "Free .co.ke Domain",
        "Unlimited Email Accounts",
        "Free SSL Certificate",
        "Unlimited Bandwidth",
        "cPanel Control",
        "Free Site-Building Tools"
      ]
    },
    {
      name: "Standard Hosting",
      price: "Ksh 499.00",
      features: [
        "250GB SSD",
        "Free .co.ke Domain",
        "100 Email Accounts",
        "Free SSL Certificate",
        "Unlimited Bandwidth",
        "cPanel Control",
        "Free Site-Building Tools",
        "5 MySQL Databases",
        "Daily Backups",
        "AI Tools"
      ],
      popular: true
    },
    {
      name: "Premium Hosting",
      price: "Ksh 699.00",
      features: [
        "500GB SSD",
        "Free .co.ke Domain",
        "Unlimited Email Accounts",
        "Free SSL Certificate",
        "Unlimited Bandwidth",
        "cPanel Control",
        "Free Site-Building Tools",
        "Unlimited MySQL Databases",
        "Daily Backups",
        "AI Tools"
      ]
    },
    {
      name: "Executive Hosting",
      price: "Ksh 1199.00",
      features: [
        "Unmetered SSD",
        "Free Lifetime Domain (.co.ke, .com, .africa)",
        "Unlimited Email Accounts",
        "Free SSL Certificate",
        "Unlimited Bandwidth",
        "cPanel Control",
        "Free Site-Building Tools",
        "Unlimited MySQL Databases",
        "Daily Backups",
        "AI Tools"
      ]
    }
  ];

  const features = [
    {
      icon: <FaFileUpload className="text-blue-600 text-2xl" />,
      title: "Upload and manage files",
      description: "Easily upload and manage your website files and folders through the intuitive file manager."
    },
    {
      icon: <FaWordpress className="text-blue-600 text-2xl" />,
      title: "Install apps instantly",
      description: "Install CMS apps like WordPress, Joomla, and more with Softaculous in seconds."
    },
    {
      icon: <FaEnvelope className="text-blue-600 text-2xl" />,
      title: "Create email accounts",
      description: "Create and manage custom email accounts for your domain with just a few clicks."
    },
    {
      icon: <FaChartLine className="text-blue-600 text-2xl" />,
      title: "Track performance",
      description: "Track your site performance with detailed analytics and resource usage statistics."
    },
    {
      icon: <FaDatabase className="text-blue-600 text-2xl" />,
      title: "Manage databases",
      description: "Control databases with powerful MySQL tools including phpMyAdmin access."
    },
    {
      icon: <FaShieldAlt className="text-blue-600 text-2xl" />,
      title: "Security tools",
      description: "Protect your site with IP blockers, hotlink protection, and SSL management."
    }
  ];

  const perfectFor = [
    {
      title: "Small Businesses",
      description: "Build, manage, and grow your brand online with our reliable hosting solutions."
    },
    {
      title: "Agencies & Freelancers",
      description: "Host and manage multiple client websites efficiently with our powerful tools."
    },
    {
      title: "Content Creators",
      description: "Focus on creating amazing content while we handle all the technical backend."
    }
  ];

  const faqs = [
    {
      question: "Is cPanel easy to use?",
      answer: "Yes, cPanel is designed to be intuitive and user-friendly for all skill levels."
    },
    {
      question: "Can I migrate my site to Belfor Host?",
      answer: "Absolutely! We offer free website migration services for all our hosting plans."
    },
    {
      question: "Do you offer support for cPanel?",
      answer: "Yes, our expert support team is available 24/7 to help with any cPanel questions."
    }
  ];

  const whyChooseIcons = [
    <FaGlobe className="text-blue-600 text-xl" />,
    <FaEnvelopeOpenText className="text-blue-600 text-xl" />,
    <FaLock className="text-blue-600 text-xl" />,
    <FaHistory className="text-blue-600 text-xl" />,
    <FaRocket className="text-blue-600 text-xl" />,
    <FaCode className="text-blue-600 text-xl" />
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-12 sm:py-16 px-4 sm:px-6"
        style={{ backgroundColor: '#3E38DA' }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Powerful cPanel Hosting
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-white mb-6 max-w-3xl mx-auto"
          >
            Manage your website, emails, databases, and apps — all in one place with an intuitive interface.
          </motion.p>
          <motion.p
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl sm:text-2xl font-bold text-yellow-300 mb-8"
          >
            Plans from just Ksh 180/month
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium flex items-center gap-2 mx-auto text-sm sm:text-base"
          >
            View Plans <FaChevronRight />
          </motion.button>
        </div>
      </motion.section>

      {/* Why Choose Section */}
      <motion.section 
        className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            variants={item}
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800"
          >
            Why Choose Belfor Host cPanel Hosting?
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              "Beginner-Friendly Dashboard",
              "Professional Email Hosting",
              "Free SSL Certificates",
              "Backup & Restore Tools",
              "1-Click App Installs",
              "Developer Features"
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    {whyChooseIcons[index]}
                  </div>
                  <h3 className="font-bold text-base sm:text-lg">{feature}</h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">
                  {feature.includes("Dashboard") && "Easily manage files, databases, and domains with our intuitive interface."}
                  {feature.includes("Email") && "Branded email accounts for your domain included with every plan."}
                  {feature.includes("SSL") && "Automatically secure your website with free SSL certificates."}
                  {feature.includes("Backup") && "Restore your website with one click using our backup tools."}
                  {feature.includes("App") && "Launch apps like WordPress, Magento, and more instantly."}
                  {feature.includes("Developer") && "SSH access, cron jobs, MySQL, and full control for developers."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Plans Section */}
      <motion.section 
        className="py-12 sm:py-16 px-4 sm:px-6 bg-white"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            variants={item}
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800"
          >
            cPanel Hosting Plans
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className={`relative bg-white border rounded-lg p-4 sm:p-6 shadow-sm ${plan.popular ? "border-blue-600 ring-2 ring-blue-200" : "border-gray-200"}`}
              >
                {plan.popular && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute top-0 right-0 bg-yellow-400 text-gray-800 text-xs font-bold px-2 py-1 rounded-bl rounded-tr"
                  >
                    Most Popular
                  </motion.div>
                )}
                
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                <p className="text-xl sm:text-2xl font-bold mb-4 text-blue-600">{plan.price}</p>
                <div className="h-px bg-gray-200 mb-4"></div>
                
                <ul className="space-y-2 sm:space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (i * 0.05) }}
                      className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base"
                    >
                      <FaCheck className="text-blue-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 sm:py-2.5 rounded-lg font-medium bg-blue-600 text-white text-sm sm:text-base"
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            variants={item}
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800"
          >
            What You Can Do With cPanel
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  {feature.icon}
                  <h3 className="font-bold text-base sm:text-lg">{feature.title}</h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Perfect For Section */}
      <motion.section 
        className="py-12 sm:py-16 px-4 sm:px-6 bg-white"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            variants={item}
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800"
          >
            Perfect For
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {perfectFor.map((item, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 p-4 sm:p-6 rounded-lg text-center border border-gray-200"
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2 
            variants={item}
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800"
          >
            cPanel Hosting FAQs
          </motion.h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FaCheck className="text-blue-600" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg">{faq.question}</h3>
                </div>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-12 sm:py-16 px-4 sm:px-6 text-white"
        style={{ backgroundColor: '#3E38DA' }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            variants={item}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
          >
            Ready to Get Started?
          </motion.h2>

          <motion.p
            variants={item}
            className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto"
          >
            Join thousands of satisfied customers who trust Belfor Host for their cPanel hosting needs.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-blue-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium flex items-center gap-2 mx-auto text-sm sm:text-base"
            >
              Choose Your Plan <FaChevronRight />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium flex items-center gap-2 mx-auto text-sm sm:text-base"
            >
              Chat With Support
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}