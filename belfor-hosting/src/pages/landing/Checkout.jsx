import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaLock, FaGlobe, FaServer } from 'react-icons/fa';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Kenya'
  });
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const domain = params.get('domain');
    const planId = params.get('plan');
    const billingCycle = params.get('cycle');
    
    // In a real app, you would fetch plan details from API
    const plan = planId ? {
      id: planId,
      name: "Premium Hosting",
      price: billingCycle === 'monthly' ? "$9.99" : "$95.88",
      cycle: billingCycle
    } : null;

    // Parse addons
    const addons = [];
    if (params.get('addon_privacy') === '1') addons.push('WHOIS Privacy Protection');
    if (params.get('addon_email') === '1') addons.push('Professional Email');
    if (params.get('addon_dns') === '1') addons.push('Premium DNS');

    setOrderDetails({
      domain,
      plan,
      addons,
      billingCycle
    });
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/order-confirmation', {
        state: {
          orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
          ...orderDetails,
          customerInfo
        }
      });
    }, 2000);
  };

  if (!orderDetails) return <div className="container mx-auto py-16 px-4">Loading order details...</div>;

  const calculateTotal = () => {
    let total = 0;
    
    // Domain price
    if (orderDetails.domain) {
      total += 9.99;
      if (orderDetails.addons.includes('WHOIS Privacy Protection')) total += 4.99;
      if (orderDetails.addons.includes('Professional Email')) total += 2.99;
      if (orderDetails.addons.includes('Premium DNS')) total += 1.99;
    }
    
    // Hosting price
    if (orderDetails.plan) {
      total += parseFloat(orderDetails.plan.price.replace('$', ''));
    }
    
    return total.toFixed(2);
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back to previous page
      </button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Complete Your Order</h1>
        <p className="text-gray-600 mb-8">Review your items and enter your information</p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Order Summary */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              {orderDetails.domain && (
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <FaGlobe className="text-blue-600 mr-2" />
                    <h3 className="font-semibold">Domain Registration</h3>
                  </div>
                  <div className="pl-6">
                    <div className="flex justify-between mb-1">
                      <span>{orderDetails.domain}</span>
                      <span>$9.99</span>
                    </div>
                    {orderDetails.addons.map((addon, index) => (
                      <div key={index} className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{addon}</span>
                        <span>
                          ${addon.includes('Privacy') ? '4.99' : 
                            addon.includes('Email') ? '2.99' : '1.99'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {orderDetails.plan && (
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <FaServer className="text-blue-600 mr-2" />
                    <h3 className="font-semibold">Hosting Plan</h3>
                  </div>
                  <div className="pl-6">
                    <div className="flex justify-between">
                      <span>{orderDetails.plan.name}</span>
                      <span>{orderDetails.plan.price}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {orderDetails.billingCycle === 'monthly' ? 'Monthly' : 'Annual'} billing
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {orderDetails.billingCycle === 'annual' && orderDetails.domain 
                    ? 'Domain registration is for 1 year. Hosting will renew annually.' 
                    : 'First payment today. Renews at regular rate.'}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Info Form */}
          <div className="lg:w-3/5">
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Customer Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country*</label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={customerInfo.country}
                      onChange={(e) => setCustomerInfo({...customerInfo, country: e.target.value})}
                    >
                      <option value="Kenya">Kenya</option>
                      <option value="Uganda">Uganda</option>
                      <option value="Tanzania">Tanzania</option>
                      <option value="Rwanda">Rwanda</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                
                <div className="space-y-4">
                  {[
                    { id: 'mpesa', name: 'M-Pesa', icon: 'mpesagreen.png', description: 'Pay via M-Pesa mobile money' },
                    { id: 'card', name: 'Credit/Debit Card', icon: 'mastercard.png', description: 'Pay with Visa, Mastercard, etc.' },
                    { id: 'bank', name: 'Bank Transfer', icon: 'transfer.jpeg', description: 'Direct bank transfer' }
                  ].map((method) => (
                    <div 
                      key={method.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === method.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <div className="flex items-center">
                        <img 
                          src={`src/assets/images/${method.icon}`} 
                          alt={method.name} 
                          className="h-6 mr-3" 
                        />
                        <div>
                          <h3 className="font-medium">{method.name}</h3>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start mb-4">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>, 
                    <a href="#" className="text-blue-600 hover:underline"> Privacy Policy</a>, and 
                    <a href="#" className="text-blue-600 hover:underline"> Refund Policy</a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center ${
                    isProcessing
                      ? 'bg-blue-400 text-white cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isProcessing ? 'Processing...' : (
                    <>
                      <FaLock className="mr-2" />
                      Complete Order
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}