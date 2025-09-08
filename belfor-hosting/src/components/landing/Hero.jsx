import { motion } from 'framer-motion';
import heroBg from '@assets/images/Hero.png';

export default function Hero() {
  return (
    <section 
      className="relative text-white min-h-[60vh] md:min-h-[70vh] bg-gradient-to-r from-[#3E38DA] to-[#3E38DA]/90"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-[#3E38DA] bg-opacity-70"></div>
      
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 h-full flex items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-left w-full md:w-1/2"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
          >
            Fastest <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-red-500 inline-block"
            >Performance</motion.span> Web Hosting
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-lg md:text-xl mb-6 max-w-xl leading-relaxed"
          >
            Take your business online with Belfor Tech Consultants.<br /> 
            Lightning-fast hosting, free SSL, unlimited bandwidth, expert 24/7 support, built for Kenyan businesses.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-start gap-4 mb-8"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
            >
              <span className="font-semibold text-sm sm:text-base">Join 1M+ customers using Belfor Host</span>
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#3E38DA] px-6 py-3 rounded-md font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}