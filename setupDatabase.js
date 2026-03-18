import { database, ref, set } from './firebase.js';

// Function to add NGOs to Firebase
const addNGOs = async () => {
  try {
    const ngosRef = ref(database, 'ngos');
    const ngosData = {
      "Red Cross": true,
      "Food Bank": true,
      "Health Aid": true,
      "Community Kitchen": true,
      "Save the Children": true
    };
    
    await set(ngosRef, ngosData);
    console.log('✅ NGOs added successfully to Firebase!');
    console.log('NGOs:', Object.keys(ngosData));
    
  } catch (error) {
    console.error('❌ Error adding NGOs:', error);
  }
};

// Run the setup
addNGOs();
