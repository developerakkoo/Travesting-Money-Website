// Firebase Configuration - Centralized Configuration File
// This file contains the Firebase configuration for the Travesting Money project

const firebaseConfig = {
    apiKey: "AIzaSyCV8_CE8XH_OXyIhtUrejvvH4BRFmfpf9Y",
    authDomain: "travestingmoney-5d9f9.firebaseapp.com",
    projectId: "travestingmoney-5d9f9",
    storageBucket: "travestingmoney-5d9f9.firebasestorage.app",
    messagingSenderId: "896872312270",
    appId: "1:896872312270:web:7bcc11ffb16ada4c334f9f",
    measurementId: "G-S4T735QWJD"
};

// Export the configuration for use in other files
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = firebaseConfig;
} else {
    // Browser environment - make it globally available
    window.firebaseConfig = firebaseConfig;
}

// Initialize Firebase if Firebase SDK is loaded
function initializeFirebase() {
    if (typeof firebase !== 'undefined') {
        try {
            // Check if Firebase is already initialized
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
                console.log('Firebase initialized successfully');
                return firebase;
            } else {
                console.log('Firebase already initialized');
                return firebase;
            }
        } catch (error) {
            console.error('Firebase initialization error:', error);
            return null;
        }
    } else {
        console.warn('Firebase SDK not loaded. Make sure to include Firebase scripts before this file.');
        return null;
    }
}

// Auto-initialize if Firebase is available
if (typeof firebase !== 'undefined') {
    const firebaseApp = initializeFirebase();
    if (firebaseApp) {
        console.log('✅ Firebase initialized successfully with project:', firebaseConfig.projectId);
        console.log('✅ Firebase app name:', firebaseApp.name);
    }
} else {
    console.log('⚠️ Firebase SDK not loaded yet');
}

// Export the initialization function
if (typeof module !== 'undefined' && module.exports) {
    module.exports.initializeFirebase = initializeFirebase;
} else {
    window.initializeFirebase = initializeFirebase;
} 