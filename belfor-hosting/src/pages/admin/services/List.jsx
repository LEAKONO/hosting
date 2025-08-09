import React, { useState, useEffect } from 'react';
import { Card, Table, Loader, Badge, Modal } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';
import { formatDate } from '../../utils/formatters';

const ServicesList = () => {
  const { getServices } = useAdmin();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [getServices]);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Customer', accessor: 'customerName' },
    { header: 'Service Type', accessor: 'serviceType' },
    { header: 'Domain', accessor: 'domain' },
    { header: 'Created', accessor: 'createdAt', format: formatDate },
    { 
      header: 'Status', 
      cell: (row) => (
        <Badge 
          variant={
            row.status === 'active' ? 'success' : 
            row.status === 'suspended' ? 'warning' : 'danger'
          }
        >
          {row.status}
        </Badge>
      )
    },
    { 
      header: 'Actions', 
      cell: (row) => (
        <button 
          onClick={() => {
            setSelectedService(row);
            setIsModalOpen(true);
          }}
          className="text-blue-600 hover:text-blue-800"
        >
          Manage
        </button>
      )
    }
  ];

  const handleStatusChange = (id, newStatus) => {
    // API call to update service status
    console.log(`Changing service ${id} to ${newStatus}`);
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Hosting Services</h1>
      
      <Card>
        <Table data={services} columns={columns} />
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedService && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Manage Service</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Service Details</h3>
                <p>ID: {selectedService.id}</p>
                <p>Customer: {selectedService.customerName}</p>
                <p>Type: {selectedService.serviceType}</p>
                <p>Domain: {selectedService.domain}</p>
                <p>Status: {selectedService.status}</p>
              </div>
              
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Change Status</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleStatusChange(selectedService.id, 'active')}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Activate
                  </button>
                  <button 
                    onClick={() => handleStatusChange(selectedService.id, 'suspended')}
                    className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                  >
                    Suspend
                  </button>
                  <button 
                    onClick={() => handleStatusChange(selectedService.id, 'terminated')}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Terminate
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ServicesList;