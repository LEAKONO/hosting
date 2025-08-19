import { FaCheckCircle, FaEnvelope, FaPhone, FaHome } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const order = state || {
    orderId: 'ORD-123456',
    domain: 'example.com',
    plan: {
      name: 'Premium Hosting',
      price: '$9.99'
    },
    customerInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com'
    }
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="text-green-500 text-6xl mb-4 flex justify-center">
          <FaCheckCircle />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Complete!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your order #{order.orderId}
        </p>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-left">
          <h2 className="text-xl font-bold mb-4">Order Details</h2>
          
          {order.domain && (
            <div className="mb-4">
              <h3 className="font-semibold mb-1">Domain Registration</h3>
              <p className="text-gray-700">{order.domain}</p>
            </div>
          )}

          {order.plan && (
            <div className="mb-4">
              <h3 className="font-semibold mb-1">Hosting Plan</h3>
              <p className="text-gray-700">{order.plan.name} - {order.plan.price}</p>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="font-semibold mb-2">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <FaEnvelope className="text-gray-500 mr-2" />
                <span>{order.customerInfo.email}</span>
              </div>
              {order.customerInfo.phone && (
                <div className="flex items-center">
                  <FaPhone className="text-gray-500 mr-2" />
                  <span>{order.customerInfo.phone}</span>
                </div>
              )}
              {order.customerInfo.address && (
                <div className="flex items-center">
                  <FaHome className="text-gray-500 mr-2" />
                  <span>{order.customerInfo.address}, {order.customerInfo.city}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">What's Next?</h2>
          <ul className="space-y-3 text-left">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>We've sent a confirmation email to <strong>{order.customerInfo.email}</strong> with your order details</span>
            </li>
            {order.domain && (
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Your domain <strong>{order.domain}</strong> will be activated within 24 hours</span>
              </li>
            )}
            {order.plan && (
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Hosting account setup instructions will be sent to your email</span>
              </li>
            )}
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Our support team is available 24/7 if you need any help</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/user/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Go to Dashboard
          </a>
          <a
            href="/support"
            className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}