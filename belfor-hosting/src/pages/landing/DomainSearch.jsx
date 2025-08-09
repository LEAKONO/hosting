import { useState } from 'react';
import { FaSearch, FaGlobe } from 'react-icons/fa';

export default function DomainSearch() {
  const [domain, setDomain] = useState('');
  const [tld, setTld] = useState('.com');

  const tlds = ['com', 'net', 'org', '.biz', 'xyz']; // Only .biz has the dot

  const pricing = [
    { tld: '.com', price: 'D3', type: '1G2YHW', color: 'text-blue-600' },
    { tld: '.net', price: '8.8', type: 'KB YHW', color: 'text-green-600' },
    { tld: '.org', price: '5.3', type: 'KB YHW', color: 'text-purple-600' },
    { tld: '.biz', price: '26', type: 'KB YHW', color: 'text-red-600' },
    { tld: '.xyz', price: '103', type: 'KB YHW', color: 'text-orange-600' },
  ];

  return (
    <div className="relative max-w-4xl mx-auto -mt-16 z-10 px-6">
      {/* Search Container */}
      <div className="bg-white rounded-lg shadow-xl p-4">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="flex-1 flex border-2 border-blue-500 rounded-lg overflow-hidden">
            <input
              type="text"
              className="flex-1 px-4 py-3 focus:outline-none border-0 bg-white"
              placeholder="Enter your domain name"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
            <select
              className="px-4 py-3 bg-gray-50 border-l-2 border-blue-500 focus:outline-none"
              value={tld}
              onChange={(e) => setTld(e.target.value)}
            >
              {tlds.map((ext) => (
                <option key={ext} value={`.${ext.replace('.', '')}`}>
                  {ext}
                </option>
              ))}
            </select>
          </div>
          
          {/* Search Button */}
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <FaSearch /> Search
          </button>
        </div>

        {/* Pricing Grid with colored TLDs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-0 rounded-b-lg overflow-hidden">
          {pricing.map((item, index) => (
            <div 
              key={index} 
              className="text-center p-4 bg-gray-100 border-t-2 border-white"
            >
              <div className={`text-2xl font-bold ${item.color}`}>
                {item.tld}
              </div>
              <div className="text-lg font-semibold">{item.price}</div>
              <div className="text-sm text-gray-500">{item.type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}