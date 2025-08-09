import { FaUserCircle, FaServer, FaFileInvoice, FaTicketAlt } from 'react-icons/fa'
import { formatDistanceToNow } from 'date-fns'

export default function UserActivityFeed() {
  const activities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'created',
      type: 'service',
      item: 'Business Hosting',
      time: new Date(Date.now() - 1000 * 60 * 5) 
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'paid',
      type: 'invoice',
      item: 'INV-2023-001',
      amount: 'KES 2,499',
      time: new Date(Date.now() - 1000 * 60 * 30) 
    },
    {
      id: 3,
      user: 'Mike Johnson',
      action: 'opened',
      type: 'ticket',
      item: 'Cannot access cPanel',
      time: new Date(Date.now() - 1000 * 60 * 120) 
    }
  ]

  const getIcon = (type) => {
    switch (type) {
      case 'service': return <FaServer className="text-blue-500" />
      case 'invoice': return <FaFileInvoice className="text-green-500" />
      case 'ticket': return <FaTicketAlt className="text-yellow-500" />
      default: return <FaUserCircle className="text-gray-500" />
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-4">Recent User Activity</h3>
      
      <div className="space-y-4">
        {activities.map(activity => (
          <div key={activity.id} className="flex">
            <div className="mr-3 mt-1">
              {getIcon(activity.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="font-medium">{activity.user}</p>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(activity.time, { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm">
                {activity.action} {activity.type} {activity.item}
                {activity.amount && ` (${activity.amount})`}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-4 w-full text-sm text-primary font-medium hover:underline">
        View All Activity
      </button>
    </div>
  )
}