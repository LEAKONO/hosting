import { FaArrowUp, FaArrowDown } from 'react-icons/fa'

export default function AdminStatsCard({ 
  title, 
  value, 
  change, 
  icon, 
  currency = '',
  lastUpdated = '',
  className = '' 
}) {
  const isPositive = change && parseFloat(change) >= 0
  
  return (
    <div className={`bg-white p-4 rounded-lg shadow border-l-4 border-primary ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1">
            {currency && `${currency} `}{value}
          </p>
        </div>
        {icon && (
          <div className="p-2 rounded-full bg-primary/10 text-primary text-lg">
            {icon}
          </div>
        )}
      </div>
      
      <div className="mt-2 flex justify-between items-end">
        {change && (
          <p className={`text-sm flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? (
              <FaArrowUp className="mr-1" size={12} />
            ) : (
              <FaArrowDown className="mr-1" size={12} />
            )}
            {Math.abs(parseFloat(change))}% {lastUpdated || 'from last period'}
          </p>
        )}
      </div>
    </div>
  )
}