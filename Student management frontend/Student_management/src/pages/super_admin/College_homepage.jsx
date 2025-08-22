import React from 'react';
import { useNavigate } from 'react-router-dom';

function CollegeHomepage() {
  const navigate = useNavigate();

  const handleUpgradeClick = () => {
    navigate('/payment_option'); // Navigate to package selection page
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome to the College Admin Dashboard</h2>
      <p>This is a demo college dashboard.</p>

      <button
        onClick={handleUpgradeClick}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '20px'
        }}
      >
        Upgrade Package
      </button>
    </div>
  );
}

export default CollegeHomepage;
