import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database, ref, push, get, update } from './firebase';

const Donate = () => {
  const [formData, setFormData] = useState({
    source: '',
    resource: '',
    quantity: '',
    location: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Resource options with icons based on source
  const getResourceOptions = () => {
    switch (formData.source) {
      case 'Restaurant':
        return [
          { value: 'Food', label: '🍽️ Food', icon: '🍽️' }
        ];
      case 'Pharmacy':
        return [
          { value: 'Medicine', label: '💊 Medicine', icon: '💊' }
        ];
      case 'Personal':
      default:
        return [
          { value: 'Food', label: '🍎 Food', icon: '🍎' },
          { value: 'Medicine', label: '💊 Medicine', icon: '💊' },
          { value: 'Clothing', label: '👕 Clothing', icon: '👕' },
          { value: 'Books', label: '📚 Books', icon: '📚' },
          { value: 'Toys', label: '🧸 Toys', icon: '🧸' },
          { value: 'Electronics', label: '📱 Electronics', icon: '📱' },
          { value: 'Other', label: '📦 Other', icon: '📦' }
        ];
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset resource when source changes
      ...(name === 'source' ? { resource: '' } : {})
    }));
  };

  const allocateToNGO = async (surplusKey, resourceType, sourceType, location) => {
    try {
      // Fetch NGOs from Firebase
      const ngosRef = ref(database, 'ngos');
      const ngosSnapshot = await get(ngosRef);
      
      if (ngosSnapshot.exists()) {
        const ngos = ngosSnapshot.val();
        const ngoNames = Object.keys(ngos);
        
        if (ngoNames.length > 0) {
          let selectedNGO = '';
          
          // Smart allocation based on resource type and location
          if (sourceType === 'Personal') {
            // Personal donations - allocate based on resource type
            if (resourceType === 'Food' || resourceType === 'Clothing') {
              selectedNGO = 'Community Kitchen';
            } else if (resourceType === 'Medicine' || resourceType === 'Books') {
              selectedNGO = 'Health Aid';
            } else if (resourceType === 'Toys') {
              selectedNGO = 'Save the Children';
            } else {
              selectedNGO = ngoNames[Math.floor(Math.random() * ngoNames.length)];
            }
          } else if (sourceType === 'Restaurant') {
            // Restaurant food - allocate to food organizations
            selectedNGO = 'Food Bank';
          } else if (sourceType === 'Pharmacy') {
            // Pharmacy items - allocate to health organizations
            selectedNGO = 'Health Aid';
          } else {
            // Default random allocation
            selectedNGO = ngoNames[Math.floor(Math.random() * ngoNames.length)];
          }
          
          // Update the surplus record with allocated NGO
          const surplusRef = ref(database, `surplus/${surplusKey}`);
          await update(surplusRef, { 
            allocatedTo: selectedNGO,
            allocationLogic: `Smart: ${sourceType} -> ${resourceType} -> ${selectedNGO}`
          });
          
          return selectedNGO;
        }
      }
      
      // If no NGOs found
      const surplusRef = ref(database, `surplus/${surplusKey}`);
      await update(surplusRef, { 
        allocatedTo: "No NGOs available",
        allocationLogic: 'No NGOs found in database'
      });
      return "No NGOs available";
      
    } catch (error) {
      console.error('Error allocating to NGO:', error);
      return "Allocation failed";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const surplusData = {
        ...formData,
        allocatedTo: "Allocating...",
        timestamp: Date.now()
      };

      let surplusKey = '';
      
      // Store data in Firebase under "surplus"
      try {
        const surplusRef = ref(database, 'surplus');
        const newSurplus = push(surplusRef, surplusData);
        surplusKey = newSurplus.key;
      } catch (firebaseError) {
        console.error('Firebase error:', firebaseError);
        alert('Error connecting to database. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Run smart allocation function
      const allocatedNGO = await allocateToNGO(surplusKey, formData.resource, formData.source, formData.location);
      
      alert(`Resource submitted successfully! Allocated to: ${allocatedNGO}`);
      
      // Reset form
      setFormData({
        source: '',
        resource: '',
        quantity: '',
        location: ''
      });
      
    } catch (error) {
      console.error('Error submitting donation:', error);
      alert('Error submitting donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="donate-container">
      <div className="donate-card">
        <h2>Donate Resources</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="source">Source *</label>
            <select
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              required
            >
              <option value="">Select Source</option>
              <option value="Restaurant">🍽️ Restaurant</option>
              <option value="Pharmacy">💊 Pharmacy</option>
              <option value="Personal">👤 Personal</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="resource">Resource Type *</label>
            <div className="resource-grid">
              {getResourceOptions().map((resource) => (
                <div
                  key={resource.value}
                  className={`resource-option ${formData.resource === resource.value ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, resource: resource.value }))}
                >
                  <span className="resource-icon">{resource.icon}</span>
                  <span className="resource-label">{resource.label}</span>
                </div>
              ))}
            </div>
            <input
              type="hidden"
              id="resource"
              name="resource"
              value={formData.resource}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity *</label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g., 10 kg, 5 boxes"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, State"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Donation'}
          </button>

          <button
            type="button"
            className="btn btn-secondary back-btn"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donate;
