import { FaExclamationTriangle, FaMoneyBillWave } from 'react-icons/fa'

export default function InvoiceAlert({ count = 48, amount = '18,148.22' }) {
  return (
    <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0 text-red-500 mt-1 mr-3">
          <FaExclamationTriangle size={20} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-red-800">Overdue Invoices</h3>
              <p className="text-red-600">
                You have {count} overdue invoice(s) with a total balance due of ${amount} USD
              </p>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 flex items-center gap-2">
              <FaMoneyBillWave /> Pay Now
            </button>
          </div>
          
          <div className="mt-3 pt-3 border-t border-red-100">
            <p className="text-sm text-red-700">
              <strong>Due immediately:</strong> ${Math.round(parseFloat(amount.replace(',', '')) * 0.4).toLocaleString()} USD
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}