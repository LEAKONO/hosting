import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

export default function FeatureGrid() {
  const clients = [
    { name: 'amazon', logo: '/src/assets/images/amazon.png' },
    { name: 'microsoft', logo: '/src/assets/images/microsoft.png' },
    { name: 'google', logo: '/src/assets/images/google.png' },
    { name: 'yahoo', logo: '/src/assets/images/yahoo.png' },
    { name: 'mpesa', logo: '/src/assets/images/mpesa.png' },
    { name: 'safaricom', logo: '/src/assets/images/saf.png' }
  ];

  const techColumns = [
    ['WordPress', 'Shopify', 'ERP'],  
    ['CRM', 'AI', 'AWS']              
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-12 items-center mb-16"
        >
          <motion.div variants={itemVariants} className="lg:w-1/2">
            <img 
              src="/src/assets/images/why-choose.png" 
              alt="Why Choose Belfor Tech"
              className="rounded-xl shadow-lg w-full"
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Why Choose Belfor Tech for Web Hosting?</h2>
            
            <div className="space-y-4">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ),
                  title: "99.9% Uptime Guarantee",
                  description: "Ensure your website is always accessible."
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Fast Performance",
                  description: "Optimized servers for high-speed loading."
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ),
                  title: "Free SSL Certificates",
                  description: "Secure your site with HTTPS encryption."
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ),
                  title: "Instant Setup",
                  description: "Get your hosting activated immediately."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="bg-blue-100 p-2 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Client logos marquee */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-8 mb-16 bg-gray-50 rounded-xl overflow-hidden"
        >
          <div className="animate-marquee whitespace-nowrap">
            {[...clients, ...clients].map((client, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.1 }}
                className="inline-block mx-8"
              >
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="h-10 opacity-70 hover:opacity-100 transition-opacity inline-block"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-12 items-center mb-16"
        >
          <motion.div variants={itemVariants} className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">World Class Best Hosting Feature For You</h2>
            
            <div className="space-y-4">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  ),
                  title: "cPanel Control Panel",
                  description: "We strive to provide top rare reliability and affordability that most shared hosting will bring quality."
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  ),
                  title: "Daily Offsite Backups",
                  description: "We strive to provide top rare reliability and affordability that most shared hosting will bring quality."
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Latest Technology",
                  description: "We strive to provide top rare reliability and affordability that most shared hosting will bring quality."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="bg-blue-100 p-3 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="lg:w-1/2">
            <img 
              src="/src/assets/images/world-class.png" 
              alt="World Class Features"
              className="rounded-xl shadow-lg w-full"
            />
          </motion.div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Transforming Industries through Innovative Technology</h2>
            <p className="text-lg text-gray-600 mb-8">
              Our enterprise-grade infrastructure powers startups, SMEs, and corporations across industries—ensuring 99.9% uptime, free SSL, and seamless scalability.
            </p>
            
            <div className="flex gap-8 mb-8">
              {techColumns.map((column, colIndex) => (
                <div key={colIndex} className="space-y-4 flex-1">
                  {column.map((tech) => (
                    <motion.div 
                      key={tech}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      className="flex items-center gap-3"
                    >
                      <FiCheckCircle className="text-[#3E38DA] w-5 h-5 flex-shrink-0" />
                      <span className="text-gray-800 font-medium">{tech}</span>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#3E38DA] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#2E2AA3] transition"
            >
              Learn More About Us
            </motion.button>
          </motion.div>
          
          <motion.div variants={itemVariants} className="lg:w-1/2">
            <img 
              src="/src/assets/images/transform.png" 
              alt="Transforming Industries"
              className="rounded-xl shadow-lg w-full"
            />
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          display: inline-block;
        }
      `}</style>
    </section>
  );
}