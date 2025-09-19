import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tickets() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    department: 'technical',
    priority: 'medium',
    description: ''
  });

  const [files, setFiles] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);
    // In a real application, you would send the ticket data to your backend here
    setTimeout(() => setShowAlert(false), 5000);
  };

  const ticketFaqs = [
    {
      question: 'How long does it take to get a response to my ticket?',
      answer: 'Our average response time is under 30 minutes for high priority issues, and within 2 hours for standard requests.'
    },
    {
      question: 'What information should I include in my ticket?',
      answer: 'Please include your domain name, detailed description of the issue, steps to reproduce, and any error messages you\'re seeing.'
    },
    {
      question: 'Can I update my ticket after submission?',
      answer: 'Yes, you can reply to your ticket email thread or log into the client area to add additional information.'
    },
    {
      question: 'How do I check the status of my ticket?',
      answer: 'You can view all your tickets and their status in the client area under Support > My Tickets.'
    },
  ];

  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const slideIn = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const fileItemVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Submit a Ticket</h1>
          <p className="mt-3 text-xl text-gray-500">Our support team is ready to help you with any issues</p>
        </motion.div>
        
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-md bg-green-50 p-4 mb-6"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Ticket Submitted Successfully!</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Your ticket #HT{Math.floor(1000 + Math.random() * 9000)} has been created. We'll contact you shortly.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div variants={scaleIn} className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Brief description of your issue"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                    Department *
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing Department</option>
                    <option value="sales">Sales Questions</option>
                    <option value="abuse">Abuse Department</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                    Priority *
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent (Service Down)</option>
                  </select>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Issue Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Please provide detailed information about your issue..."
                />
                <p className="mt-2 text-sm text-gray-500">
                  The more details you provide, the faster we can help resolve your issue.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700">Attachments</label>
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                >
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload files</span>
                        <input 
                          id="file-upload" 
                          name="file-upload" 
                          type="file" 
                          multiple 
                          className="sr-only" 
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF, PDF up to 10MB each</p>
                  </div>
                </motion.div>
                
                <AnimatePresence>
                  {files.length > 0 && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeIn}
                      className="mt-4"
                    >
                      <h4 className="text-sm font-medium text-gray-700">Selected files:</h4>
                      <ul className="mt-2 divide-y divide-gray-200">
                        <AnimatePresence>
                          {files.map((file, index) => (
                            <motion.li
                              key={index}
                              variants={fileItemVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="py-3 flex justify-between items-center"
                            >
                              <div className="flex items-center">
                                <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                                <span className="ml-2 text-sm font-medium text-gray-900 truncate">{file.name}</span>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                type="button"
                                onClick={() => removeFile(index)}
                                className="ml-4 bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </motion.button>
                            </motion.li>
                          ))}
                        </AnimatePresence>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit Ticket
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>

        <motion.div variants={slideIn} className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Ticket FAQs</h3>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-4">
                  {ticketFaqs.map((faq, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ x: 5 }}
                      className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                    >
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="flex justify-between items-center w-full text-left focus:outline-none"
                      >
                        <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                        <motion.svg
                          animate={{ rotate: openAccordion === index ? 180 : 0 }}
                          className="h-5 w-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </motion.svg>
                      </button>
                      <AnimatePresence>
                        {openAccordion === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 overflow-hidden"
                          >
                            <p className="text-sm text-gray-500">{faq.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Support Channels</h3>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-blue-50 rounded-lg p-5 mb-6"
            >
              <h4 className="text-base font-medium text-blue-800 mb-3">24/7 Support Available</h4>
              <ul className="space-y-2">
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <svg className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-sm text-blue-700"><strong>Ticket System:</strong> (Current) Recommended for technical issues</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <svg className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="ml-2 text-sm text-blue-700"><strong>Email:</strong> support@hostingplatform.com</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <svg className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="ml-2 text-sm text-blue-700"><strong>Phone:</strong> +1 (555) 123-4567 (24/7)</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <svg className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-sm text-blue-700"><strong>Live Chat:</strong> Available in client area</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <svg className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  <span className="ml-2 text-sm text-blue-700"><strong>Knowledge Base:</strong> Over 500 articles available</span>
                </motion.li>
              </ul>
              <div className="mt-4 flex space-x-3">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-3 py-2 border border-blue-500 text-sm leading-4 font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Visit Knowledge Base
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Open Live Chat
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-red-50 rounded-lg p-5"
            >
              <h4 className="text-base font-medium text-red-800 mb-3">Emergency Contact</h4>
              <p className="text-sm text-red-700 mb-2">For complete service outage or critical issues:</p>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                <span className="ml-2 text-sm font-medium text-red-900">Emergency Phone: +1 (555) 911-HOST</span>
              </div>
              <p className="mt-2 text-xs text-red-600">Available 24/7 for critical issues only</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}