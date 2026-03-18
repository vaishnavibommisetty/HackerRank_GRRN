# GRRN - Global Resource Redistribution Network

A React web application that connects donors with NGOs to efficiently redistribute surplus resources like food and medicine.

## Features

- **User Authentication**: Login and registration system
- **Resource Donation**: Donate food or medicine from restaurants or pharmacies
- **Smart Allocation**: Automatic allocation of resources to NGOs
- **NGO Dashboard**: View all available resources and allocation status
- **Real-time Updates**: Firebase integration for real-time data

## Tech Stack

- React 18 with functional components and hooks
- React Router DOM for navigation
- Firebase Realtime Database for data storage
- Modern CSS with responsive design

## Pages

1. **Login Page** - Email/password authentication
2. **Register Page** - New user registration
3. **Home Page** - Dashboard with navigation options
4. **Donate Page** - Form to donate resources with automatic NGO allocation
5. **NGO Dashboard** - View all surplus resources and statistics

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Resource_redistribution
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a new Firebase project at https://console.firebase.google.com
   - Enable Realtime Database
   - Copy your Firebase configuration
   - Update the `firebaseConfig` object in `src/firebase.js`

4. Start the development server:
```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

## Firebase Setup

### Database Structure

The app uses Firebase Realtime Database with the following structure:

```
{
  "surplus": {
    "unique_id_1": {
      "source": "Restaurant",
      "resource": "Food",
      "quantity": "10 kg",
      "location": "New York, NY",
      "allocatedTo": "NGO Name",
      "timestamp": 1234567890
    },
    "unique_id_2": { ... }
  },
  "ngos": {
    "NGO Name 1": true,
    "NGO Name 2": true
  }
}
```

### Sample NGO Data

Add some sample NGOs to your Firebase database:

```javascript
{
  "ngos": {
    "Red Cross": true,
    "Food Bank": true,
    "Health Aid": true,
    "Community Kitchen": true
  }
}
```

## Usage

1. **Login/Register**: Create an account or login with existing credentials
2. **Donate Resources**: Fill out the donation form with resource details
3. **Automatic Allocation**: The system automatically assigns resources to random NGOs
4. **View Dashboard**: NGOs can view all available resources and allocation status

## Features in Detail

### Donation Process
1. User fills out donation form (source, resource type, quantity, location)
2. Data is stored in Firebase under "surplus" collection
3. System fetches available NGOs from "ngos" collection
4. Random NGO is assigned to the donation
5. Allocation status is updated in real-time

### NGO Dashboard
- View all available resources
- Filter by resource type (Food/Medicine)
- See allocation status
- View summary statistics
- Real-time data refresh

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
