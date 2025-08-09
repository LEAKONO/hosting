import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa'

export default function Alert({ 
  children, 
  type = 'info', 
  dismissible = false, 
  onDismiss,
  className = '' 
}) {
  const alertConfig = {
    info: {
      icon: <FaInfoCircle className="mr-2" />,
      bg: 'bg-blue-50',
      border: 'border-blue-400',
      text: 'text-blue-700'
    },
    success: {
      icon: <FaCheckCircle className="mr-2" />,
      bg: 'bg-green-50',
      border: 'border-green-400',
      text: 'text-green-700'
    },
    warning: {
      icon: <FaExclamationTriangle className="mr-2" />,
      bg: 'bg-yellow-50',
      border: 'border-yellow-400',
      text: 'text-yellow-700'
    },
    error: {
      icon: <FaExclamationTriangle className="mr-2" />,
      bg: 'bg-red-50',
      border: 'border-red-400',
      text: 'text-red-700'
    }
  }

  return (
    <div 
      className={`border-l-4 p-4 rounded relative ${alertConfig[type].bg} ${alertConfig[type].border} ${alertConfig[type].text} ${className}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {alertConfig[type].icon}
        </div>
        <div className="flex-1">
          {children}
        </div>
        {dismissible && (
          <button 
            onClick={onDismiss}
            className="ml-2 text-current hover:opacity-75"
          >
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  )
}