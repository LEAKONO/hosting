export default function DomainTransfer() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Transfer Your Domain</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Easy Domain Transfer Process</h2>
          
          <div className="mb-6">
            <div className="flex">
              <input
                type="text"
                placeholder="Enter your domain name..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
                Transfer
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              { step: 1, title: "Unlock Domain", desc: "At your current registrar" },
              { step: 2, title: "Get EPP Code", desc: "Authorization code from current registrar" },
              { step: 3, title: "Start Transfer", desc: "Enter domain and EPP code with us" }
            ].map((item) => (
              <div key={item.step} className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                  {item.step}
                </div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-medium text-green-800 mb-1">Transfer Benefits</h3>
            <p className="text-green-700">
              Get 1 year free extension when you transfer your domain to us!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}