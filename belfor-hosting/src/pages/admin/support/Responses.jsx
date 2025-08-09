import React, { useState, useEffect } from 'react';
import { Card, Loader, Modal, Alert } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';

const CannedResponses = () => {
  const { getCannedResponses, createCannedResponse, updateCannedResponse } = useAdmin();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResponse, setCurrentResponse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'general',
    content: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const data = await getCannedResponses();
        setResponses(data);
      } catch (error) {
        console.error('Error fetching canned responses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, [getCannedResponses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentResponse) {
        await updateCannedResponse(currentResponse.id, formData);
      } else {
        await createCannedResponse(formData);
      }
      // Refresh the list
      const data = await getCannedResponses();
      setResponses(data);
      setIsModalOpen(false);
      setCurrentResponse(null);
    } catch (error) {
      setError(error.message || 'An error occurred');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Canned Responses</h1>
        <button 
          onClick={() => {
            setCurrentResponse(null);
            setFormData({
              title: '',
              category: 'general',
              content: ''
            });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Response
        </button>
      </div>

      {error && <Alert variant="danger" className="mb-6">{error}</Alert>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {responses.map((response) => (
          <Card key={response.id}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{response.title}</h3>
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                {response.category}
              </span>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-3">{response.content}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setCurrentResponse(response);
                  setFormData({
                    title: response.title,
                    category: response.category,
                    content: response.content
                  });
                  setIsModalOpen(true);
                }}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Edit
              </button>
              <button className="text-gray-600 hover:text-gray-800 text-sm">
                Use
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {currentResponse ? 'Edit Canned Response' : 'Add New Canned Response'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="general">General</option>
                  <option value="billing">Billing</option>
                  <option value="technical">Technical</option>
                  <option value="sales">Sales</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  rows="8"
                  required
                />
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {currentResponse ? 'Update' : 'Create'} Response
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CannedResponses;