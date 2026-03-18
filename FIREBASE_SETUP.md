# Firebase Setup Guide for GRRN

## Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Project name: `grrn-resource-network`
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Realtime Database
1. In your project dashboard, go to "Build" → "Realtime Database"
2. Click "Create Database"
3. Choose location: Select your region
4. Start in "Test mode" (for now)
5. Click "Enable"

## Step 3: Get Your Firebase Config
1. Go to Project Settings (⚙️ icon)
2. Under "Your apps", click "Web app"
3. Copy the firebaseConfig object
4. It will look like this:
```javascript
const firebaseConfig = {
  apiKey: "your-real-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-real-app-id"
};
```

## Step 4: Update Your Code
Replace the demo config in `src/firebase.js` with your real config

## Step 5: Set Up Database Rules
In Realtime Database → Rules, replace with:
```json
{
  "rules": {
    "surplus": {
      ".read": true,
      ".write": true
    },
    "ngos": {
      ".read": true,
      ".write": true
    }
  }
}
```

## Step 6: Add Sample NGOs
In Realtime Database → Data, add:
```json
{
  "ngos": {
    "Red Cross": true,
    "Food Bank": true,
    "Health Aid": true,
    "Community Kitchen": true,
    "Save the Children": true
  }
}
```

## Your Real Data Structure
```
grrn-resource-network-default-rtdb.firebaseio.com/
├── surplus/
│   ├── -Nabc123def456/
│   │   ├── source: "Restaurant"
│   │   ├── resource: "Food"
│   │   ├── quantity: "10 kg"
│   │   ├── location: "New York"
│   │   ├── allocatedTo: "Red Cross"
│   │   └── timestamp: 1702876800000
│   └── -Ndef789ghi012/
│       └── ...
└── ngos/
    ├── "Red Cross": true
    ├── "Food Bank": true
    └── ...
```

## Benefits of Real Firebase
✅ Persistent data storage
✅ Real-time updates across all users
✅ Security rules for data protection
✅ Scalable to millions of records
✅ Backup and restore capabilities
✅ Analytics and monitoring
