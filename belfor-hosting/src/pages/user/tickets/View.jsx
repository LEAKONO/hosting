import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Loader, Alert, Badge } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/formatters';

const TicketView = () => {
  const { id } = useParams();
  const { getSupportTicket, addTicketReply } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replying, setReplying] = useState(false);
  const [error, setError] = useState('');
  const [reply, setReply] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await getSupportTicket(id);
        setTicket(data);
      } catch (error) {
        setError(error.message || 'Failed to load ticket');
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id, getSupportTicket]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    
    if (!reply.trim()) {
      setError('Reply cannot be empty');
      return;
    }
    
    setReplying(true);
    setError('');
    
    try {
      const updatedTicket = await addTicketReply(id, reply);
      setTicket(updatedTicket);
      setReply('');
    } catch (error) {
      setError(error.message || 'Failed to submit reply');
    } finally {
      setReplying(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!ticket) return <Alert variant="warning">Ticket not found</Alert>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ticket #{ticket.id}</h1>
        <Badge 
          variant={
            ticket.status === 'open' ? 'danger' : 
            ticket.status === 'pending' ? 'warning' : 'success'
          }
        >
          {ticket.status}
        </Badge>
      </div>
      
      <Card className="mb-6">
        <div className="border-b pb-4 mb-4">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-bold">{ticket.subject}</h2>
            <div className="flex items-center gap-2">
              <Badge 
                variant={
                  ticket.priority === 'high' ? 'danger' : 
                  ticket.priority === 'medium' ? 'warning' : 'info'
                }
              >
                {ticket.priority}
              </Badge>
              <span className="text-sm text-gray-600">
                {formatDate(ticket.createdAt)}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Department: {ticket.department}
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-lg font-bold text-gray-600">
                {ticket.user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{ticket.user.name}</span>
                <span className="text-sm text-gray-500">
                  {formatDate(ticket.createdAt)}
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="whitespace-pre-line">{ticket.message}</p>
              </div>
              {ticket.attachments.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-1">Attachments:</p>
                  <div className="flex gap-2">
                    {ticket.attachments.map((file, index) => (
                      <a 
                        key={index} 
                        href={file.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          ></path>
                        </svg>
                        {file.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {ticket.replies.map((reply, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-600">
                  {reply.isStaff ? 'S' : ticket.user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">
                    {reply.isStaff ? 'Support Team' : ticket.user.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(reply.timestamp)}
                  </span>
                </div>
                <div className={`p-4 rounded ${
                  reply.isStaff ? 'bg-blue-50' : 'bg-gray-50'
                }`}>
                  <p className="whitespace-pre-line">{reply.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      <Card>
        <h2 className="text-lg font-semibold mb-4">Add Reply</h2>
        
        {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
        
        <form onSubmit={handleReplySubmit}>
          <div className="space-y-4">
            <div>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                rows="5"
                placeholder="Type your reply here..."
                required
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={replying}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
              >
                {replying ? 'Submitting...' : 'Submit Reply'}
              </button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default TicketView;