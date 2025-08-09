import React, { useState, useEffect } from 'react';
import { Card, Table, Loader, Badge, Modal } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';
import { formatDate } from '../../utils/formatters';

const UsersList = () => {
  const { getUsers } = useAdmin();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(searchQuery, statusFilter);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [searchQuery, statusFilter, getUsers]);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
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
    { header: 'Joined', accessor: 'createdAt', format: formatDate },
    { header: 'Last Active', accessor: 'lastActive', format: formatDate },
    { 
      header: 'Actions', 
      cell: (row) => (
        <button 
          onClick={() => {
            setSelectedUser(row);
            setIsModalOpen(true);
          }}
          className="text-blue-600 hover:text-blue-800"
        >
          View
        </button>
      )
    }
  ];

  const handleStatusChange = (userId, newStatus) => {
    // API call to update user status
    console.log(`Changing user ${userId} to ${newStatus}`);
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded pl-10"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      <Card>
        <Table data={users} columns={columns} />
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedUser && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge variant={selectedUser.status === 'active' ? 'success' : 'danger'}>
                    {selectedUser.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Joined</p>
                  <p className="font-medium">{formatDate(selectedUser.createdAt)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Last Active</p>
                  <p className="font-medium">{formatDate(selectedUser.lastActive)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Services</p>
                  <p className="font-medium">{selectedUser.servicesCount}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Actions</p>
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => handleStatusChange(selectedUser.id, 'active')}
                    className={`px-3 py-1 rounded text-sm ${
                      selectedUser.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    disabled={selectedUser.status === 'active'}
                  >
                    Activate
                  </button>
                  <button 
                    onClick={() => handleStatusChange(selectedUser.id, 'inactive')}
                    className={`px-3 py-1 rounded text-sm ${
                      selectedUser.status === 'inactive' 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    disabled={selectedUser.status === 'inactive'}
                  >
                    Deactivate
                  </button>
                  <button 
                    onClick={() => handleStatusChange(selectedUser.id, 'suspended')}
                    className={`px-3 py-1 rounded text-sm ${
                      selectedUser.status === 'suspended' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    disabled={selectedUser.status === 'suspended'}
                  >
                    Suspend
                  </button>
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UsersList;