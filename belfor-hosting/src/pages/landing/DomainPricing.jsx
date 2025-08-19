export default function DomainPricing() {
  const domains = [
    { extension: '.com', register: 'KSh 1,200', renew: 'KSh 1,500' },
    { extension: '.co.ke', register: 'KSh 1,000', renew: 'KSh 1,200' },
    { extension: '.org', register: 'KSh 1,300', renew: 'KSh 1,600' },
    { extension: '.net', register: 'KSh 1,400', renew: 'KSh 1,700' },
    { extension: '.info', register: 'KSh 1,100', renew: 'KSh 1,300' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Domain Pricing</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Competitive Domain Pricing</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Domain</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Renewal</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {domains.map((domain) => (
                  <tr key={domain.extension}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{domain.extension}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{domain.register}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{domain.renew}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">All domain registrations include:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Free DNS management</li>
              <li>Free domain forwarding</li>
              <li>Free WHOIS privacy (where available)</li>
              <li>24/7 customer support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}