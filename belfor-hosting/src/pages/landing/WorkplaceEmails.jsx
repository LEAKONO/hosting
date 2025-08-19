import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCheck, 
  FaChevronRight, 
  FaShieldAlt, 
  FaEnvelope, 
  FaCloud, 
  FaUsers,
  FaCalendarAlt,
  FaMobileAlt,
  FaSyncAlt,
  FaGlobe,
  FaBuilding
} from 'react-icons/fa';

export default function WorkplaceEmails() {
  const [activePlan, setActivePlan] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);
const plans = [
  {
    name: "Workplace Starter",
    price: "KES 672",
    period: "/year",
    description: "Perfect for independent and small teams getting started.",
    features: [
      "2% Security & Anti-Virus Protection",
      "Advanced Anti-Spam Filtering",
      "10 Aliases per Mailbox",
      "10 Forwarding Rules",
      "1 Mailbox (30GB Storage)",
      "Drive Cloud Storage",
      "Docs, Sheets, Presentations"
    ],
    buttonText: "Start 30-Day Free Trial"
  },
  {
    name: "Workplace Pro",
    price: "KES 1,764",
    period: "/year",
    description: "Ideal for growing teams that need more collaboration.",
    features: [
      "Everything in Starter, plus:",
      "30 Aliases, 30 Forwarding Rules",
      "3 Mailboxes",
      "Team Storage",
      "Full Collaboration Tools",
      "Drive Storage & Productivity Suite"
    ],
    buttonText: "Start 30-Day Free Trial",
    popular: true
  },
  {
    name: "Workplace Enterprise",
    price: "KES 672",
    period: "/year",
    description: "For large organizations with advanced needs.",
    features: [
      "Everything in Pro, plus:",
      "Unlimited Mailboxes",
      "Advanced Admin Controls",
      "Email Archiving & Compliance",
      "24/7 Premium Support",
      "Custom Domain Options",
      "Advanced Analytics"
    ],
    buttonText: "Contact Sales"
  }
];

  const perfectFor = [
    {
      icon: <FaGlobe className="text-blue-600 text-2xl" />,
      title: "Remote teams",
      description: "Seamless collaboration for distributed teams across locations and timezones."
    },
    {
      icon: <FaEnvelope className="text-blue-600 text-2xl" />,
      title: "Professional communications",
      description: "Seamless collaboration for distributed teams across locations and timezones."
    },
    {
      icon: <FaShieldAlt className="text-blue-600 text-2xl" />,
      title: "Secure document sharing",
      description: "Share files with confidence using advanced security and permissions."
    },
    {
      icon: <FaBuilding className="text-blue-600 text-2xl" />,
      title: "SMEs and startups",
      description: "Scalable solutions that grow with your business needs."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-16 px-4" style={{ backgroundColor: '#3E38DA' }}>
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Collaborate. Communicate.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white"
          >
            Empower your startup or business with enterprise-grade email solutions.
          </motion.p>
          
          {/* Two buttons with proper spacing */}
   <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white text-blue-700 px-8 py-3 rounded-lg font-bold"
  >
    Start Free Trial
  </motion.button>
  
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-blue-700 text-white border border-white px-8 py-3 rounded-lg font-bold flex items-center gap-2"
  >
    View Plans <FaChevronRight />
  </motion.button>
</div>


        </div>
      </section>

      {/* Perfect For Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Perfect for</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {perfectFor.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-start gap-6"
              >
                <div className="bg-blue-100 p-3 rounded-full mt-1">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
     <section className="py-16 px-4 bg-gray-50">
  <div className="max-w-6xl mx-auto">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Plans & Pricing</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Simple, transparent pricing that scales with your business.
      </p>
      <div className="h-px bg-gray-300 my-8 max-w-4xl mx-auto"></div>
    </motion.div>

    <div className="grid md:grid-cols-3 gap-8">
      {plans.map((plan, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -5 }}
          className={`bg-white rounded-xl shadow-lg p-6 relative ${plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''}`}
        >
          {plan.popular && (
            <div className="absolute top-0 right-0 bg-[#FFC107] text-gray-800 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
              MOST POPULAR
            </div>
          )}
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
          <div className="flex items-baseline mb-4">
            <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
            <span className="text-gray-600 ml-1">{plan.period}</span>
          </div>
          <p className="text-gray-600 mb-6">{plan.description}</p>
          
          <div className="h-px bg-gray-200 my-6"></div>
          
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium mb-6 hover:bg-blue-700 transition-colors">
            {plan.buttonText}
          </button>
          
          <ul className="space-y-3">
            {plan.features.map((feature, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start"
              >
                <FaCheck className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </div>
</section>
      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to boost your team's productivity?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl mb-10 max-w-2xl mx-auto"
          >
            Join thousands of businesses that trust our platform every day.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold text-lg"
          >
            Get started today
          </motion.button>
        </div>
      </section>
    </div>
  );
}