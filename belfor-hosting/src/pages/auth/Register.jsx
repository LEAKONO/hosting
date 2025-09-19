import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Alert from '../../components/common/Alert';
import Loader from '../../components/common/Loader';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

export default function RegisterModal({ onClose, onSwitch }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth(); // Get register function from context

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords don't match");
    }

    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters long");
    }

    if (formData.username.length < 3) {
      return setError("Username must be at least 3 characters long");
    }

    try {
      setError('');
      setLoading(true);

      // ✅ Use the register function from AuthContext
      const result = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      if (!result.success) {
        setError(result.error || 'Failed to create account');
        return;
      }

      // ✅ The navigation will be handled by the AuthContext register function
      onClose();
    } catch (err) {
      setError('Failed to create account: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: { opacity: 0, transition: { duration: 0.15, ease: "easeIn" } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 300 }
    },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.15, ease: "easeIn" } }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.2, ease: "easeOut" }
    })
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)" },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm overflow-y-auto"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden border border-gray-200 my-8"
        variants={modalVariants}
        onClick={e => e.stopPropagation()}
        style={{ marginTop: '80px' }}
      >
        {/* Header */}
        <motion.div
          className="bg-blue-600 p-4 relative"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex justify-between items-center">
            <motion.h2
              className="text-xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              Sign Up
            </motion.h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors p-1"
            >
              <FaTimes size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* Form */}
        <div className="p-5">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="mb-4"
              >
                <Alert variant="danger" className="text-sm py-2">
                  {error}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Username */}
            <motion.div variants={inputVariants} custom={0} initial="hidden" animate="visible">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <FaUser className="absolute inset-y-0 left-3 my-auto text-gray-400" />
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={e => handleInputChange('username', e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Choose username"
                  required
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={inputVariants} custom={1} initial="hidden" animate="visible">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute inset-y-0 left-3 my-auto text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={inputVariants} custom={2} initial="hidden" animate="visible">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute inset-y-0 left-3 my-auto text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={e => handleInputChange('password', e.target.value)}
                  className="w-full pl-9 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                </button>
              </div>
            </motion.div>

            {/* Confirm Password */}
            <motion.div variants={inputVariants} custom={3} initial="hidden" animate="visible">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute inset-y-0 left-3 my-auto text-gray-400" />
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={e => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full pl-9 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                </button>
              </div>
            </motion.div>

            {/* Submit */}
            <motion.div variants={inputVariants} custom={4} initial="hidden" animate="visible" className="pt-2">
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                disabled={loading}
                type="submit"
                className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md text-sm font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader size="sm" className="mr-2" /> Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Switch to Login */}
          <motion.div className="mt-4 text-center border-t border-gray-200 pt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <p className="text-xs text-gray-600">
              Already have an account?{' '}
              <button type="button" onClick={() => onSwitch('login')} className="text-blue-600 hover:text-blue-800 font-medium">
                Sign In
              </button>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}