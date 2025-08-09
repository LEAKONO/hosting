import React, { useState, useEffect } from 'react';
import { Table, Card, Loader, Modal } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';
import { formatDate, formatCurrency } from '../../utils/formatters';

const Invoices = () => {
  const { getInvoices } = useAdmin();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getInvoices();
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, [getInvoices]);

  const columns = [
    { header: 'Invoice #', accessor: 'invoiceNumber' },
    { header: 'Customer', accessor: 'customerName' },
    { header: 'Date', accessor: 'date', format: formatDate },
    { header: 'Amount', accessor: 'amount', format: formatCurrency },
    { header: 'Status', accessor: 'status' },
    { 
      header: 'Actions', 
      cell: (row) => (
        <button 
          onClick={() => {
            setSelectedInvoice(row);
            setIsModalOpen(true);
          }}
          className="text-blue-600 hover:text-blue-800"
        >
          View
        </button>
      )
    }
  ];

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Invoice Management</h1>
      
      <Card>
        <Table data={invoices} columns={columns} />
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedInvoice && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
            <div className="space-y-2">
              <p><strong>Invoice #:</strong> {selectedInvoice.invoiceNumber}</p>
              <p><strong>Customer:</strong> {selectedInvoice.customerName}</p>
              <p><strong>Date:</strong> {formatDate(selectedInvoice.date)}</p>
              <p><strong>Amount:</strong> {formatCurrency(selectedInvoice.amount)}</p>
              <p><strong>Status:</strong> {selectedInvoice.status}</p>
              <div className="mt-4">
                <h3 className="font-semibold">Items:</h3>
                <ul className="list-disc pl-5">
                  {selectedInvoice.items.map((item, index) => (
                    <li key={index}>
                      {item.description} - {formatCurrency(item.amount)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Invoices;