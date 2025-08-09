import React, { useState, useEffect } from 'react';
import { Card, Table, Loader, Modal, Alert } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';

const ServiceTypes = () => {
  const { getServiceTypes, createServiceType, updateServiceType } = useAdmin();
  const [serviceTypes, setServiceTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentType, setCurrentType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    features: []
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const data = await getServiceTypes();
        setServiceTypes(data);
      } catch (error) {
        console.error('Error fetching service types:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServiceTypes();
  }, [getServiceTypes]);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Description', accessor: 'description' },
    { header: 'Price', accessor: 'price' },
    { 
      header: 'Actions', 
      cell: (row) => (
        <button 
          onClick={() => {
            setCurrentType(row);
            setFormData({
              name: row.name,
              description: row.description,
              price: row.price,
              features: row.features
            });
            setIsModalOpen(true);
          }}
          className="text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>
      )
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentType) {
        await updateServiceType(currentType.id, formData);
      } else {
        await createServiceType(formData);
      }
      // Refresh the list
      const data = await getServiceTypes();
      setServiceTypes(data);
      setIsModalOpen(false);
      setCurrentType(null);
    } catch (error) {
      setError(error.message || 'An error occurred');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Service Types</h1>
        <button 
          onClick={() => {
            setCurrentType(null);
            setFormData({
              name: '',
              description: '',
              price: '',
              features: []
            });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Type
        </button>
      </div>

      <Card>
        <Table data={serviceTypes} columns={columns} />
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {currentType ? 'Edit Service Type' : 'Add New Service Type'}
          </h2>
          
          {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  rows="3"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Price (USD)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Features</label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border rounded"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="bg-red-500 text-white px-2 rounded"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="bg-gray-200 px-3 py-1 rounded text-sm"
                  >
                    + Add Feature
                  </button>
                </div>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {currentType ? 'Update' : 'Create'} Service Type
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ServiceTypes;