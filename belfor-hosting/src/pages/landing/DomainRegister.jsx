export default function DomainRegister() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Register a Domain</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Find your perfect domain name</h2>
          
          <div className="flex mb-6">
            <input
              type="text"
              placeholder="Search for a domain..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="border-t border-b border-gray-300 px-2 bg-gray-50">
              <option>.com</option>
              <option>.co.ke</option>
              <option>.org</option>
              <option>.net</option>
            </select>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Domain Registration Features</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Free DNS Management</li>
              <li>Domain Lock Protection</li>
              <li>Easy Renewal Process</li>
              <li>24/7 Support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}