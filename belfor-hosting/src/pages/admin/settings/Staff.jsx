import React, { useState, useEffect } from 'react';
import { Card, Loader, Alert, Badge, Table, Modal } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';
import { formatDate } from '../../utils/formatters';

const StaffSettings = () => {
  const { getStaffMembers, createStaffMember, updateStaffMember } = useAdmin();
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'support',
    status: 'active'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await getStaffMembers();
        setStaff(data);
      } catch (error) {
        console.error('Error fetching staff:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, [getStaffMembers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      if (currentStaff) {
        await updateStaffMember(currentStaff.id, formData);
        setSuccess('Staff member updated successfully');
      } else {
        await createStaffMember(formData);
        setSuccess('Staff member created successfully');
      }
      
      // Refresh the list
      const data = await getStaffMembers();
      setStaff(data);
      setIsModalOpen(false);
      setCurrentStaff(null);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message || 'An error occurred');
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { 
      header: 'Role', 
      cell: (row) => (
        <Badge 
          variant={
            row.role === 'admin' ? 'danger' : 
            row.role === 'manager' ? 'warning' : 'info'
          }
        >
          {row.role}
        </Badge>
      )
    },
    { 
      header: 'Status', 
      cell: (row) => (
        <Badge 
          variant={row.status === 'active' ? 'success' : 'danger'}
        >
          {row.status}
        </Badge>
      )
    },
    { header: 'Last Active', accessor: 'lastActive', format: formatDate },
    { 
      header: 'Actions', 
      cell: (row) => (
        <button 
          onClick={() => {
            setCurrentStaff(row);
            setFormData({
              name: row.name,
              email: row.email,
              role: row.role,
              status: row.status
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

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <button 
          onClick={() => {
            setCurrentStaff(null);
            setFormData({
              name: '',
              email: '',
              role: 'support',
              status: 'active'
            });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Staff Member
        </button>
      </div>
      
      {error && <Alert variant="danger" className="mb-6">{error}</Alert>}
      {success && <Alert variant="success" className="mb-6">{success}</Alert>}

      <Card>
        <Table data={staff} columns={columns} />
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {currentStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
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
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="admin">Administrator</option>
                  <option value="manager">Manager</option>
                  <option value="support">Support</option>
                  <option value="billing">Billing</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              {currentStaff && (
                <div className="pt-2">
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 mr-2"
                  >
                    Send Password Reset
                  </button>
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    View Activity
                  </button>
                </div>
              )}
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  {currentStaff ? 'Update' : 'Create'} Staff Member
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default StaffSettings;