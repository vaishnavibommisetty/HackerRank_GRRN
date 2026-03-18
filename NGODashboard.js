import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { database, ref, get } from './firebase';

const NGODashboard = () => {
  const [surplusData, setSurplusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSurplusData();
  }, []);

  const fetchSurplusData = async () => {
    try {
      setLoading(true);
      const surplusRef = ref(database, 'surplus');
      const snapshot = await get(surplusRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedData = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setSurplusData(formattedData);
      } else {
        setSurplusData([]);
      }
    } catch (error) {
      console.error('Error fetching surplus data:', error);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString();
};

const getResourceIcon = (resource) => {
  const icons = {
    'Food': '🍎',
    'Medicine': '💊',
    'Clothing': '👕',
    'Books': '📚',
    'Toys': '🧸',
    'Electronics': '📱',
    'Other': '📦'
  };
  return icons[resource] || '📦';
};

const getSourceIcon = (source) => {
  const icons = {
    'Restaurant': '🍽️',
    'Pharmacy': '💊',
    'Personal': '👤'
  };
  return icons[source] || '📦';
};  

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>NGO Dashboard</h2>
        
        <div className="dashboard-header">
          <h3>Available Resources</h3>
          <button className="btn btn-secondary" onClick={fetchSurplusData}>
            Refresh Data
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading resources...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : surplusData.length === 0 ? (
          <div className="no-data">
            <p>No resources available at the moment.</p>
            <p>Check back later for new donations.</p>
          </div>
        ) : (
          <div className="resources-grid">
            {surplusData.map((item) => (
              <div key={item.id} className="resource-card">
                <div className="resource-header">
                  <span className="resource-type">
                    {getResourceIcon(item.resource)} {item.resource}
                  </span>
                  <span className="resource-source">
                    {getSourceIcon(item.source)} {item.source}
                  </span>
                </div>
                
                <div className="resource-details">
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Location:</strong> {item.location}</p>
                  <p><strong>Date:</strong> {formatDate(item.timestamp)}</p>
                  <p><strong>Allocated to:</strong> 
                    <span className={`allocation-status ${item.allocatedTo === 'Allocating...' ? 'pending' : 'allocated'}`}>
                      {item.allocatedTo}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="dashboard-stats">
          <h3>Summary Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Total Resources</h4>
              <p className="stat-number">{surplusData.length}</p>
            </div>
            <div className="stat-card">
              <h4>Food Items</h4>
              <p className="stat-number">
                {surplusData.filter(item => item.resource === 'Food').length}
              </p>
            </div>
            <div className="stat-card">
              <h4>Medicine Items</h4>
              <p className="stat-number">
                {surplusData.filter(item => item.resource === 'Medicine').length}
              </p>
            </div>
            <div className="stat-card">
              <h4>Clothing Items</h4>
              <p className="stat-number">
                {surplusData.filter(item => item.resource === 'Clothing').length}
              </p>
            </div>
            <div className="stat-card">
              <h4>Personal Donations</h4>
              <p className="stat-number">
                {surplusData.filter(item => item.source === 'Personal').length}
              </p>
            </div>
            <div className="stat-card">
              <h4>Allocated</h4>
              <p className="stat-number">
                {surplusData.filter(item => 
                  item.allocatedTo !== 'Allocating...' && 
                  item.allocatedTo !== 'No NGOs available'
                ).length}
              </p>
            </div>
          </div>
        </div>

        <button className="btn btn-secondary back-btn" onClick={() => navigate('/home')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NGODashboard;
