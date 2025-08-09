import { FiCheckCircle } from 'react-icons/fi';

export default function FeatureSection() {
  const clients = [
    { name: 'amazon', logo: '/src/assets/images/amazon.png' },
    { name: 'microsoft', logo: '/src/assets/images/microsoft.png' },
    { name: 'google', logo: '/src/assets/images/google.png' },
    { name: 'yahoo', logo: '/src/assets/images/yahoo.png' },
    { name: 'mpesa', logo: '/src/assets/images/mpesa.png' },
    { name: 'safaricom', logo: '/src/assets/images/saf.png' }
  ];

  const techColumns = [
    ['WordPress', 'Shopify', 'ERP'],  
    ['CRM', 'AI', 'AWS']              
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
          <div className="lg:w-1/2">
            <img 
              src="/src/assets/images/why-choose.png" 
              alt="Why Choose Belfor Tech"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Why Choose Belfor Tech for Web Hosting?</h2>
            
            <div className="space-y-4"> {/* Reduced space-y to account for feature padding */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"> {/* Added gray bg and padding */}
                <div className="bg-blue-100 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">99.9% Uptime Guarantee</h3>
                  <p className="text-gray-600">Ensure your website is always accessible.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Fast Performance</h3>
                  <p className="text-gray-600">Optimized servers for high-speed loading.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Free SSL Certificates</h3>
                  <p className="text-gray-600">Secure your site with HTTPS encryption.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Instant Setup</h3>
                  <p className="text-gray-600">Get your hosting activated immediately.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-8 mb-16 bg-gray-50 rounded-xl overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            {[...clients, ...clients].map((client, index) => (
              <div key={index} className="inline-block mx-8">
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="h-10 opacity-70 hover:opacity-100 transition-opacity inline-block"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">World Class Best Hosting Feature For You</h2>
            
            <div className="space-y-4"> {/* Reduced space-y to account for feature padding */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"> {/* Added gray bg and padding */}
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">cPanel Control Panel</h3>
                  <p className="text-gray-600">We strive to provide top rare reliability and affordability that most shared hosting will bring quality.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Daily Offsite Backups</h3>
                  <p className="text-gray-600">We strive to provide top rare reliability and affordability that most shared hosting will bring quality.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Latest Technology</h3>
                  <p className="text-gray-600">We strive to provide top rare reliability and affordability that most shared hosting will bring quality.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <img 
              src="/src/assets/images/world-class.png" 
              alt="World Class Features"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Transforming Industries through Innovative Technology</h2>
            <p className="text-lg text-gray-600 mb-8">
              Our enterprise-grade infrastructure powers startups, SMEs, and corporations across industries—ensuring 99.9% uptime, free SSL, and seamless scalability.
            </p>
            
            <div className="flex gap-8 mb-8">
              {techColumns.map((column, colIndex) => (
                <div key={colIndex} className="space-y-4 flex-1">
                  {column.map((tech) => (
                    <div key={tech} className="flex items-center gap-3">
                      <FiCheckCircle className="text-[#3E38DA] w-5 h-5 flex-shrink-0" />
                      <span className="text-gray-800 font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            <button className="bg-[#3E38DA] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#2E2AA3] transition">
              Learn More About Us
            </button>
          </div>
          
          <div className="lg:w-1/2">
            <img 
              src="/src/assets/images/transform.png" 
              alt="Transforming Industries"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          display: inline-block;
        }
      `}</style>
    </section>
  );
}