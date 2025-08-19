import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  FaSearch, 
  FaArrowRight, 
  FaCheck, 
  FaServer, 
  FaClock, 
  FaLock, 
  FaUserTie, 
  FaLaptopCode, 
  FaChartLine,
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaBolt,
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
  },
  tap: {
    scale: 0.98
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
    y: [0, -5, 0, -3, 0],
    transition: {
      duration: 1,
      repeat: Infinity
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

const testimonialVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
};

export default function HostingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Intersection observer hooks
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [plansRef, plansInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [audienceRef, audienceInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [faqRef, faqInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const testimonials = [
    {
      id: 1,
      quote: "I launched my website in under an hour. Before Float made it stress-free.",
      author: "Mary W.",
      location: "Nairobi, Kenya",
      rating: 5
    },
    {
      id: 2,
      quote: "The speed boost after moving my site here was incredible. My bounce rate dropped by 40%!",
      author: "James O.",
      location: "Mombasa, Kenya",
      rating: 5
    },
    {
      id: 3,
      quote: "As a small business owner, I needed reliable hosting that wouldn't break the bank. This was the perfect solution!",
      author: "Susan K.",
      location: "Kisumu, Kenya",
      rating: 5
    },
    {
      id: 4,
      quote: "The customer support team is amazing. They helped me migrate my site and answered all my questions patiently.",
      author: "David M.",
      location: "Eldoret, Kenya",
      rating: 5
    },
    {
      id: 5,
      quote: "I've tried several hosting providers in Kenya, and this one stands out for its consistent performance and uptime.",
      author: "Grace N.",
      location: "Nakuru, Kenya",
      rating: 5
    }
  ];

  const faqs = [
    { 
      question: "Do I need hosting for my website?", 
      answer: "Yes. Hosting is what puts your website online and makes it accessible to users. Without hosting, your website files have nowhere to 'live' on the internet." 
    },
    { 
      question: "Can I start small and upgrade?", 
      answer: "Definitely! We make it easy to scale up anytime as your needs grow. You can upgrade your plan with just a few clicks in your control panel, often without any downtime." 
    },
    { 
      question: "Do you provide backups?", 
      answer: "Yes - your data is safely backed up regularly. Our Business and Enterprise plans include daily automatic backups, while our Starter plan includes weekly backups. You can also create manual backups anytime." 
    },
    { 
      question: "What if I need help setting up my website?", 
      answer: "Our support team is available 24/7 to help with any questions. We also provide extensive documentation and video tutorials to guide you through every step of setting up your website." 
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-16 px-6"
        style={{ backgroundColor: '#3E38DA' }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Powerful Web Hosting Made Simple
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-blue-100"
          >
            Our flexible hosting solutions are designed for speed, scalability, and simplicity. Perfect for your first website or growing business.
          </motion.p>
          
          <motion.div 
  variants={itemVariants}
  className="mt-8 flex justify-center"
>
  <motion.button
    className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg font-medium flex items-center gap-2"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    View Hosting Plans
    <FaArrowRight className="text-blue-600" />
  </motion.button>
</motion.div>

        </div>
      </motion.section>

      {/* Features Section */}
     <motion.section 
  ref={featuresRef}
  initial="hidden"
  animate={featuresInView ? "visible" : "hidden"}
  variants={containerVariants}
  className="py-16 px-6 bg-gray-50"
>
  <div className="max-w-6xl mx-auto text-center">
    
    {/* New Subtitle */}
    <motion.p 
  variants={itemVariants}
  className="mb-4"
  style={{ color: "#3E38DA" }}
>
  Why Choose Belfor Host
</motion.p>


    {/* Main Heading */}
    <motion.h2 
      variants={itemVariants}
      className="text-3xl font-bold mb-12 text-gray-900"
    >
      Web Hosting Built for Performance
    </motion.h2>

    {/* Features Grid */}
    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          icon: <FaBolt className="text-blue-600 text-xl" />, // ⚡ flash icon
          title: "Speed First",
          desc: "SSD-powered servers deliver ultra-fast loading times for your website visitors."
        },
        {
          icon: <FaLock className="text-blue-600 text-xl" />, 
          title: "Free SSL",
          desc: "Secure your website and earn your visitors' trust with included SSL certificates."
        },
        { 
          icon: <FaClock className="text-blue-600 text-xl" />, 
          title: "Always Online", 
          desc: "Enjoy 99.9% uptime to keep your site accessible to customers around the clock." 
        },
        { 
          icon: <FaCheck className="text-blue-600 text-xl" />, 
          title: "1-Click Installations", 
          desc: "Set up WordPress, Joomla, Drupal & more with just one click." 
        },
        { 
          icon: <FaUserTie className="text-blue-600 text-xl" />, 
          title: "Local Experts", 
          desc: "Our 24/7 Kenyan support team is always ready to assist with any questions." 
        },
        { 
          icon: <FaArrowRight className="text-blue-600 text-xl" />, 
          title: "Free Migration", 
          desc: "Move your existing site without downtime or fees. We handle everything for you." 
        }
      ].map((feature, i) => (
        <motion.div 
          key={i}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-white p-6 rounded-lg shadow-md text-left"
        >
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
          <p className="text-gray-600">{feature.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</motion.section>

      {/* Pricing Plans Section */}
    <motion.section 
  ref={plansRef}
  initial="hidden"
  animate={plansInView ? "visible" : "hidden"}
  variants={containerVariants}
  className="py-16 px-6"
  style={{ backgroundColor: "#DBEAFE80" }}
>
  <div className="max-w-6xl mx-auto">
    <motion.h2 
      variants={itemVariants}
      className="text-3xl font-bold text-center mb-4 text-gray-900"
    >
      Find Your Perfect Hosting Plan
    </motion.h2>

    <motion.p 
      variants={itemVariants}
      className="text-center mb-12"
      style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 800,
        fontSize: "28px",
        lineHeight: "100%",
        color: "#3E38DA"
      }}
    >
      Plans start from just KES 188/month
    </motion.p>

    <div className="grid md:grid-cols-3 gap-8">
      
      {/* Starter Plan */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ y: -10 }}
        className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
      >
        <h3 className="text-xl font-bold mb-2 text-gray-900">Starter</h3>
        <p className="text-gray-600 mb-4">Perfect for personal websites and blogs</p>
        <p className="text-3xl font-bold mb-6">KES 188</p>
        <ul className="space-y-3 mb-6">
          <li className="flex items-center">
            <FaCheck className="text-green-500 mr-2" />
            <span>1 Website</span>
          </li>
          <li className="flex items-center">
            <FaCheck className="text-green-500 mr-2" />
            <span>100GB SSD Storage</span>
          </li>
          <li className="flex items-center">
            <FaCheck className="text-green-500 mr-2" />
            <span>Unmetered Bandwidth</span>
          </li>
          <li className="flex items-center">
            <FaCheck className="text-green-500 mr-2" />
            <span>Free SSL Certificate</span>
          </li>
        </ul>
        <motion.button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Started
        </motion.button>
      </motion.div>

     {/* Business Plan (highlighted middle card) */}
<motion.div 
  variants={itemVariants}
  whileHover={{ y: -10, scale: 1.07 }}
  className="bg-white border-2 border-blue-600 rounded-lg p-6 shadow-md relative transform scale-105 overflow-hidden"
>
  {/* Adjusted ribbon position - pushed higher */}
  <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-12 py-1 transform rotate-45 origin-bottom-left translate-x-7 -translate-y-2 shadow-md">
    Most Popular
  </div>

  <h3 className="text-xl font-bold mb-2 text-gray-900">Business</h3>
  <p className="text-gray-600 mb-4">Ideal for growing businesses and ecommerce</p>
  <p className="text-3xl font-bold mb-6">KES 499</p>
  <ul className="space-y-3 mb-6">
    <li className="flex items-center">
      <FaCheck className="text-green-500 mr-2" />
      <span>Unlimited Websites</span>
    </li>
    <li className="flex items-center">
      <FaCheck className="text-green-500 mr-2" />
      <span>500GB SSD Storage</span>
    </li>
    <li className="flex items-center">
      <FaCheck className="text-green-500 mr-2" />
      <span>Unmetered Bandwidth</span>
    </li>
    <li className="flex items-center">
      <FaCheck className="text-green-500 mr-2" />
      <span>Free SSL Certificate</span>
    </li>
    <li className="flex items-center">
      <FaCheck className="text-green-500 mr-2" />
      <span>Free Domain for 1 Year</span>
    </li>
    <li className="flex items-center">
      <FaCheck className="text-green-500 mr-2" />
      <span>Daily Backups</span>
    </li>
  </ul>
  <motion.button
    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
  >
    Get Started
  </motion.button>
</motion.div>

      {/* Enterprise Plan */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ y: -10 }}
        className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
      >
        <h3 className="text-xl font-bold mb-2 text-gray-900">Enterprise</h3>
        <p className="text-gray-600 mb-4">For high-traffic sites and advanced users</p>
        <p className="text-3xl font-bold mb-6">KES 699</p>
        <ul className="space-y-3 mb-6">
          <li className="flex items-center">
            <FaCheck className="text-green-500 mr-2" />
            <span>Unlimited Websites</span>
          </li>
          <li className="flex items-center">
            <FaCheck className="text-green-500 mr-2" />
            <span>100GB SSD Storage</span>
          </li>
          <li className="flex items-center">
            <FaCheck className="text-green-500 mr-2" />
            <span>Unmetered Bandwidth</span>
          </li>
          <li className="flex items-center">
            <FaCheck className="text-green-500 mr-2" />
            <span>Free SSL Certificate</span>
          </li>
          <li className="flex items-center">
            <FaCheck className="text-green-500 mr-2" />
            <span>Free Domain for 1 Year</span>
          </li>
          <li className="flex items-center">
            <FaCheck className="text-green-500 mr-2" />
            <span>Daily Backups</span>
          </li>
          <li className="flex items-center">
            <FaCheck className="text-green-500 mr-2" />
            <span>Dedicated Resources</span>
          </li>
          <li className="flex items-center">
            <FaCheck className="text-green-500 mr-2" />
            <span>Priority Support</span>
          </li>
        </ul>
        <motion.button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  </div>
</motion.section>


      {/* Target Audience Section */}
    <motion.section 
  ref={audienceRef}
  initial="hidden"
  animate={audienceInView ? "visible" : "hidden"}
  variants={containerVariants}
  className="py-16 px-6 bg-gray-50"
>
  <div className="max-w-6xl mx-auto text-center">
    
    <motion.p 
      variants={itemVariants}
      className="mb-2"
      style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
        fontSize: "15px",
        lineHeight: "26px",
        color: "#3E38DA"
      }}
    >
      Perfect For
    </motion.p>

    <motion.h2 
      variants={itemVariants}
      className="text-3xl font-bold mb-12 text-gray-900"
    >
      Who Can Benefit From Our Hosting
    </motion.h2>

    <div className="grid md:grid-cols-3 gap-8">
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="p-6 rounded-lg text-center"
        style={{
          background: "#DBEAFE80",
          boxShadow: "0px 5px 5px 0px #D9D9D980"
        }}
      >
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaUserTie className="text-blue-600 text-2xl" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900">Beginners</h3>
        <p className="text-gray-600">
          Intuitive tools with no coding knowledge needed. Our easy-to-use control panel makes website management simple.
        </p>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="p-6 rounded-lg text-center"
        style={{
          background: "#DBEAFE80",
          boxShadow: "0px 5px 5px 0px #D9D9D980"
        }}
      >
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaChartLine className="text-blue-600 text-2xl" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900">Business Owners</h3>
        <p className="text-gray-600">
          Ideal for ecommerce, company sites, and blogs. Reliable hosting that grows with your business.
        </p>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="p-6 rounded-lg text-center"
        style={{
          background: "#DBEAFE80",
          boxShadow: "0px 5px 5px 0px #D9D9D980"
        }}
      >
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaLaptopCode className="text-blue-600 text-2xl" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900">Developers</h3>
        <p className="text-gray-600">
          Full access to SSH, Git, multiple PHP versions, and databases. The tools professionals need.
        </p>
      </motion.div>
    </div>
  </div>
</motion.section>


      {/* Testimonials Section */}
     <motion.section 
  ref={testimonialsRef}
  initial="hidden"
  animate={testimonialsInView ? "visible" : "hidden"}
  variants={containerVariants}
  className="py-16 px-6 bg-white overflow-hidden"
>
  <div className="max-w-6xl mx-auto">
    <motion.h2 
      variants={itemVariants}
      className="text-3xl font-bold text-center mb-12 text-gray-900"
    >
      What Our Customers Say
    </motion.h2>

    <motion.div
      className="flex py-4"
      animate={{
        x: ["0%", "-100%"],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear"
          }
        }
      }}
    >
      {/* Double the testimonials array to create seamless loop */}
      {[...testimonials, ...testimonials].map((testimonial, index) => (
        <motion.div
          key={`${testimonial.id}-${index}`}
          className="flex-shrink-0 px-4 w-96" // Adjust width as needed
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
        >
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm h-full">
            <FaQuoteLeft className="text-blue-600 text-3xl mx-auto mb-4" />
            <p className="italic text-gray-700 mb-6 text-lg">"{testimonial.quote}"</p>
            <div className="flex justify-center mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 mx-1" />
              ))}
            </div>
            <p className="font-bold text-gray-900">{testimonial.author}</p>
            <p className="text-gray-600">{testimonial.location}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>

    {/* Manual navigation (optional) */}
    <div className="flex justify-center mt-8 space-x-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-600 text-white p-2 rounded-full"
        onClick={() => setCurrentTestimonial(prev => 
          prev === 0 ? testimonials.length - 1 : prev - 1
        )}
      >
        <FaChevronLeft />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-600 text-white p-2 rounded-full"
        onClick={() => setCurrentTestimonial(prev => 
          prev === testimonials.length - 1 ? 0 : prev + 1
        )}
      >
        <FaChevronRight />
      </motion.button>
    </div>
  </div>
</motion.section>
      {/* FAQ Section */}
      <motion.section 
        ref={faqRef}
        initial="hidden"
        animate={faqInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-16 px-6 bg-gray-50"
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
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <motion.button
                  className="w-full flex justify-between items-center p-4 text-left"
                  onClick={() => toggleFaq(index)}
                  whileHover={{ x: 5 }}
                >
                  <h3 className="font-bold text-gray-900">{faq.question}</h3>
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
                      <div className="p-4 pt-0 text-gray-600">
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

      {/* Final CTA Section */}
      <motion.section 
        className="py-16 px-6"
        style={{ backgroundColor: '#3E38DA' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to get started?</h2>
          <p className="text-xl mb-8 text-blue-100">Choose your hosting plan today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              View Plans
            </motion.button>
            <motion.button
              className="bg-transparent hover:bg-blue-700 text-white border border-white px-8 py-3 rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Sales
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}