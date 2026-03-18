import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <div className="home-header">
          <h1>🌍 GRRN - Global Resource Redistribution Network</h1>
          <p className="home-subtitle">
            Connecting Resources with Those Who Need Them Most
          </p>
        </div>
        
        <div className="home-hero">
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=250&fit=crop" 
              alt="Resource Redistribution" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect fill='%233498db' width='400' height='250'/%3E%3Ctext fill='white' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EGRRN Network%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
          <p className="home-intro">
            Welcome to the Global Resource Redistribution Network! 
            Our platform connects donors from restaurants, pharmacies, and individuals with NGOs to efficiently redistribute surplus resources.
          </p>
        </div>

        <div className="home-actions">
          <button className="btn btn-primary" onClick={() => navigate('/donate')}>
            🎁 Donate Resources
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/ngo-dashboard')}>
            📊 NGO Dashboard
          </button>
        </div>

        <div className="home-features">
          <div className="feature">
            <div className="feature-icon">🍎</div>
            <h3>Food Redistribution</h3>
            <p>Connect surplus food from restaurants and individuals to NGOs fighting hunger</p>
          </div>
          <div className="feature">
            <div className="feature-icon">💊</div>
            <h3>Medicine Distribution</h3>
            <p>Redistribute unused medicines from pharmacies and personal donations to healthcare NGOs</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🤝</div>
            <h3>Smart Allocation</h3>
            <p>Automated system to allocate resources to the most suitable NGOs efficiently</p>
          </div>
          <div className="feature">
            <div className="feature-icon">👥</div>
            <h3>Personal Donations</h3>
            <p>Individuals can now donate personal resources to help those in need</p>
          </div>
        </div>

        <div className="home-stats">
          <h3>Our Impact</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Resources Donated</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Partner NGOs</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Lives Impacted</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
