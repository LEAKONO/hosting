import { FaCube, FaPlus } from 'react-icons/fa'

export default function ServiceCard() {
  const services = [] 

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <FaCube className="mr-2 text-primary" />
          Your Active Products/Services
        </h2>
        <button className="text-primary hover:text-green-800 text-sm font-medium flex items-center">
          <FaPlus className="mr-1" /> Add Service
        </button>
      </div>

      {services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FaCube className="text-gray-400 text-xl" />
          </div>
          <p className="text-gray-500 mb-4">It appears you don't have any products/services with us yet.</p>
          <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-800 transition flex items-center mx-auto">
            <FaPlus className="mr-2" /> Place an Order
          </button>
        </div>
      )}
    </div>
  )
}