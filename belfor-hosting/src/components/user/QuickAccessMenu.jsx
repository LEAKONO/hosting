import { 
  FaServer, 
  FaGlobe, 
  FaFileInvoiceDollar, 
  FaHeadset,
  FaUserCog,
  FaCreditCard
} from 'react-icons/fa'

export default function QuickAccessMenu() {
  const menuItems = [
    { icon: <FaServer size={18} />, label: 'Hosting', path: '/user/services' },
    { icon: <FaGlobe size={18} />, label: 'Domains', path: '/user/domains' },
    { icon: <FaFileInvoiceDollar size={18} />, label: 'Invoices', path: '/user/billing/invoices' },
    { icon: <FaCreditCard size={18} />, label: 'Payments', path: '/user/billing/payments' },
    { icon: <FaHeadset size={18} />, label: 'Support', path: '/user/tickets' },
    { icon: <FaUserCog size={18} />, label: 'Settings', path: '/user/settings' }
  ]

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-4">Quick Access</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.path}
            className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
          >
            <span className="text-primary mb-2">{item.icon}</span>
            <span className="text-sm text-center">{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}