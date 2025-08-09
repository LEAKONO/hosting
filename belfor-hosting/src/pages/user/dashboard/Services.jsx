import React, { useState, useEffect } from 'react';
import { Card, Loader, Badge, Alert } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/formatters';

const ServicesDashboard = () => {
  const { getServices } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        setError(error.message || 'Failed to load services');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [getServices]);

  if (loading) return <Loader />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Services</h1>
      
      {services.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">No services found</h3>
            <p className="text-gray-600 mb-4">
              You don't have any active services yet.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Order New Service
            </button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{service.name}</h3>
                <Badge 
                  variant={
                    service.status === 'active' ? 'success' : 
                    service.status === 'suspended' ? 'warning' : 'danger'
                  }
                >
                  {service.status}
                </Badge>
              </div>
              
              <p className="text-gray-600 mb-4">{service.domain}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Due:</span>
                  <span>{formatDate(service.nextDueDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Billing Cycle:</span>
                  <span>{service.billingCycle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold">${service.amount}</span>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Manage
                </button>
                <button className="text-gray-600 hover:text-gray-800 text-sm">
                  View Invoice
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesDashboard;