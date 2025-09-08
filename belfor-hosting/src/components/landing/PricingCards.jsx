import { motion } from 'framer-motion';
import { useState } from 'react';

export default function PricingCards() {
  const [activePeriod, setActivePeriod] = useState('Monthly');

  const plans = [
    {
      name: 'Starting Hosting',
      price: 'Ksh 149.00',
      period: 'per month',
      features: [
        '5GB SSD Storage',
        'Free .ke Domain',
        'Unlimited Email Accounts',
        'Free SSL Certificate',
        'Unlimited Bandwidth',
        'cPanel Control',
        'Free Site-Building Tools'
      ],
      popular: false
    },
    {
      name: 'Standard Hosting',
      price: 'Ksh 499.00',
      period: 'per month',
      features: [
        '25GB SSD Storage',
        'Free .ke Domain',
        '100 Email Accounts',
        'Free SSL Certificate',
        'Unlimited Bandwidth',
        'cPanel Control',
        'Free Site-Building Tools',
        '5 MySQL Databases',
        'Daily Backups',
        'AI Tools'
      ],
      popular: true
    },
    {
      name: 'Premium Hosting',
      price: 'Ksh 699.00',
      period: 'per month',
      features: [
        '50GB SSD Storage',
        'Free .ke Domain',
        'Unlimited Email Accounts',
        'Free SSL Certificate',
        'Unlimited Bandwidth',
        'cPanel Control',
        'Free Site-Building Tools',
        'Unlimited MySQL Databases',
        'Daily Backups',
        'AI Tools'
      ],
      popular: false
    },
    {
      name: 'Executive Hosting',
      price: 'Ksh 1199.00',
      period: 'per month',
      features: [
        'Unmetered SSD',
        'Free Lifetime Domain (.ke.com)',
        'Unlimited Email Accounts',
        'Free SSL Certificate',
        'Unlimited Bandwidth',
        'cPanel Control',
        'Free Site-Building Tools',
        'Unlimited MySQL Databases',
        'Daily Backups',
        'AI Tools'
      ],
      popular: false
    }
  ];

  const billingPeriods = ['Monthly', 'Semi-Annual', 'Annual', '2 Years', '3 Years'];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    hover: {
      y: -15,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#2563eb",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  const popularBadgeVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
        delay: 0.5
      }
    },
    hover: {
      scale: 1.05,
      rotate: 2,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={titleVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            We Have Perfect Web Hosting Package for You
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            Secure and scalable web hosting plans in Kenya with 24/7 support and easy domain setup. 
            Get fast SSD servers and unlimited bandwidth today.
          </motion.p>
        </motion.div>
        
        {/* Billing period buttons - Made responsive */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex flex-wrap justify-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg max-w-full">
            {billingPeriods.map((period, index) => (
              <motion.button
                key={index}
                variants={buttonVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setActivePeriod(period)}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  activePeriod === period 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white'
                }`}
                custom={index}
              >
                {period}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              className={`relative bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                plan.popular 
                  ? 'border-blue-500 shadow-2xl transform md:-translate-y-5' 
                  : 'border-gray-100 hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <motion.div 
                  variants={popularBadgeVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover="hover"
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-2 text-sm font-bold rounded-full shadow-lg z-10"
                >
                  Most Popular
                </motion.div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="text-4xl font-bold text-blue-600 mb-2 flex items-end"
                >
                  {plan.price}
                  <span className="text-base font-normal text-gray-500 ml-2">/{plan.period}</span>
                </motion.div>
                
                <ul className="my-8 space-y-4">
                  {plan.features.map((feature, i) => (
                    <motion.li 
                      key={i}
                      custom={i}
                      variants={featureVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex items-start text-gray-700"
                    >
                      <motion.svg 
                        className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </motion.svg>
                      <span className="text-sm md:text-base">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.button 
                  variants={buttonVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover="hover"
                  whileTap="tap"
                  className={`w-full py-4 rounded-xl font-bold transition duration-300 shadow-lg ${
                    plan.popular 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  Select Plan
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

       
      </div>
    </section>
  );
}