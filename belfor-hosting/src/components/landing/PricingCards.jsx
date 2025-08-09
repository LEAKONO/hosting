export default function PricingCards() {
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
  ]

  // Added billing period buttons
  const billingPeriods = ['Monthly', 'Semi-Annual', 'Annual', '2 Years', '3 Years'];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">We Have Perfect Web Hosting Package for You</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Secure and scalable web hosting plans in Kenya with 24/7 support and easy domain setup. Get fast SSD servers and unlimited bandwidth today.
          </p>
        </div>
        
        {/* Added billing period buttons */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-50 rounded-lg p-1 shadow-sm">
            {billingPeriods.map((period, index) => (
              <button
                key={index}
                className={`px-4 py-2 text-sm font-medium rounded-md ${period === 'Monthly' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900'}`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative bg-gray-50 rounded-xl shadow-lg overflow-hidden ${plan.popular ? 'ring-2 ring-[#006400] transform md:-translate-y-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#006400] text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold text-[#006400] mb-1">
                  {plan.price}
                  <span className="text-base font-normal text-gray-500">/{plan.period}</span>
                </p>
                
                <ul className="space-y-3 my-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-[#006400] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-3 rounded-lg font-bold transition duration-300 ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
                >
                  Select Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}