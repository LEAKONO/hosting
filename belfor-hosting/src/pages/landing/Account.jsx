export default function Account() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-6">My Account</h1>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <p className="text-center mb-6">Manage your account settings</p>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}