import React from 'react';
import { Card } from '../../components/common';

const QuickActions = () => {
  const actions = [
    {
      title: 'Order New Service',
      description: 'Add a new hosting service to your account',
      icon: '📦',
      action: '/services/order'
    },
    {
      title: 'Make a Payment',
      description: 'Pay your outstanding invoices',
      icon: '💳',
      action: '/billing/payments'
    },
    {
      title: 'Open Support Ticket',
      description: 'Get help from our support team',
      icon: '🛟',
      action: '/support/new'
    },
    {
      title: 'Domain Management',
      description: 'Register or transfer domains',
      icon: '🌐',
      action: '/domains'
    },
    {
      title: 'Account Settings',
      description: 'Update your profile and preferences',
      icon: '⚙️',
      action: '/settings/profile'
    },
    {
      title: 'View Documentation',
      description: 'Browse our knowledge base',
      icon: '📚',
      action: '/support/knowledgebase'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Quick Actions</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <span className="text-3xl">{action.icon}</span>
              <div>
                <h3 className="font-bold text-lg mb-1">{action.title}</h3>
                <p className="text-gray-600 mb-3">{action.description}</p>
                <a 
                  href={action.action} 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Go to {action.title} →
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;