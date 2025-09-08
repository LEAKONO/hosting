import { motion } from 'framer-motion';
import { 
  FaCheck, 
  FaShieldAlt, 
  FaLock, 
  FaSearch, 
  FaChartLine,
  FaGlobe,
  FaEnvelope,
  FaHistory,
  FaRocket,
  FaCode,
  FaChevronRight
} from 'react-icons/fa';

export default function SSLCertificates() {
  const certificates = [
    {
      name: "Basic DV SSL",
      price: "KES 750",
      period: "/year",
      features: [
        "Domain Validation",
        "Browser Padlock Enabled",
        "Fast Issuance"
      ],
      buttonText: "Select Plan"
    },
    {
      name: "Seetigo Positive SSL",
      price: "KES 1,500",
      period: "/year",
      features: [
        "Trusted by all browsers",
        "Free site seal",
        "DV Certificate"
      ],
      buttonText: "Select Plan"
    },
    {
      name: "Wildcard SSL",
      price: "KES 2,760",
      period: "/year",
      features: [
        "Protect unlimited subdomains",
        "Ideal for agencies and businesses",
        "Fast issue and install"
      ],
      buttonText: "Select Plan"
    },
    {
      name: "EV SSL",
      price: "KES 12,000",
      period: "/year",
      features: [
        "Extended Validation with company name",
        "Maximum trust and conversion",
        "Fast issue and install"
      ],
      buttonText: "Select Plan"
    }
  ];

  const benefits = [
    {
      icon: <FaLock className="text-[#3E38DA] text-2xl" />,
      title: "Secure customer data & transactions",
      description: "Protect sensitive information with industry-standard encryption."
    },
    {
      icon: <FaShieldAlt className="text-[#3E38DA] text-2xl" />,
      title: "Enable HTTPS & browser padlock",
      description: "Display the secure padlock icon and enable HTTPS for your website."
    },
    {
      icon: <FaSearch className="text-[#3E38DA] text-2xl" />,
      title: "Improve SEO rankings",
      description: "Google prioritizes HTTPS websites in search results."
    },
    {
      icon: <FaChartLine className="text-[#3E38DA] text-2xl" />,
      title: "Boost visitor trust & conversion rates",
      description: "Increase customer confidence and conversion rates with a secure site."
    }
  ];

  const features = [
    {
      icon: <FaGlobe className="text-blue-600 text-2xl" />,
      title: "Beginner-Friendly Dashboard",
      description: "Easily manage files, databases, and domains with our intuitive interface."
    },
    {
      icon: <FaEnvelope className="text-blue-600 text-2xl" />,
      title: "Professional Email Hosting",
      description: "Branded email accounts for your domain included with every plan."
    },
    {
      icon: <FaShieldAlt className="text-blue-600 text-2xl" />,
      title: "Free SSL Certificates",
      description: "Automatically secure your website with free SSL certificates."
    },
    {
      icon: <FaHistory className="text-blue-600 text-2xl" />,
      title: "Backup & Restore Tools",
      description: "Restore your website with one click using our backup tools."
    },
    {
      icon: <FaRocket className="text-blue-600 text-2xl" />,
      title: "1-Click App Installs",
      description: "Launch apps like WordPress, Magento, and more instantly."
    },
    {
      icon: <FaCode className="text-blue-600 text-2xl" />,
      title: "Developer Features",
      description: "SSH access, cron jobs, MySQL, and full control for developers."
    }
  ];

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
      <section className="py-12 px-4 bg-[#3E38DA] text-white">
        <div className="max-w-6xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-center"
          >
            SSL Certificates Secure Your Website
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-center"
          >
            Whether you're running a small blog or a high-traffic eCommerce platform, SSL Certificates are essential for protecting your visitors and increasing your SEO rankings.
          </motion.p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-[#FFFFFF66] p-4 rounded-lg text-center"
              >
                <div className="flex justify-center mb-2">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-md">{benefit.title}</h3>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#3E38DA] px-6 py-2 rounded-lg font-bold"
            >
              Get Your SSL Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Plans & Pricing</h2>
            <div className="h-px bg-gray-300 my-8 max-w-4xl mx-auto"></div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl shadow-lg p-6 relative border border-gray-100 flex flex-col"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{cert.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-gray-900">{cert.price}</span>
                  <span className="text-gray-600 ml-1">{cert.period}</span>
                </div>
                
                <ul className="space-y-3 mb-6 flex-grow">
                  {cert.features.map((feature, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start"
                    >
                      <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="h-px bg-gray-200 my-6"></div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {cert.buttonText}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-lg text-gray-600 mb-6">
              See All SSL Plans – Over 30 Premium Options
            </p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="bg-gray-100 p-6 rounded-lg"
            >
              <p className="text-gray-700 flex flex-wrap items-center justify-center gap-3 md:gap-4">
                <span className="flex items-center">
                  <FaCheck className="text-green-500 mr-1" />
                  Multi-Domain SSL
                </span>
                <span className="flex items-center">
                  <FaCheck className="text-green-500 mr-1" />
                  DV, EV & Wildcard
                </span>
                <span className="flex items-center">
                  <FaCheck className="text-green-500 mr-1" />
                  DigiCert, Seetigo, Thawte & GeoTrust brands
                </span>
                <span className="flex items-center">
                  <FaCheck className="text-green-500 mr-1" />
                  Prices range from KES 750 - KES 32,780/year
                </span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12 text-gray-800"
          >
            Why Choose Our SSL Certificates?
          </motion.h2>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  {feature.icon}
                  <h3 className="font-bold text-lg">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
     <section className="py-16 px-4 bg-[#3E38DA] text-white">
  <div className="max-w-4xl mx-auto text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-3xl md:text-4xl font-bold mb-6"
    >
      Ready to Secure Your Website?
    </motion.h2>

    <motion.p 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="text-xl mb-10 max-w-2xl mx-auto"
    >
      Protect your visitors and boost your search rankings with an SSL Certificate today.
    </motion.p>

    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
      {/* Get SSL Now button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-blue-700 px-8 py-3 rounded-md font-bold"
      >
        Get SSL Now
      </motion.button>

      {/* Contact Sales button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-transparent border border-white text-white px-8 py-3 rounded-md font-bold"
      >
        Contact Sales
      </motion.button>
    </div>
  </div>
</section>

    </div>
  );
}