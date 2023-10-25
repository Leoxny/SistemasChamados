import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA-FoNBs1t1E7onapJRoqtHweJknESx-VE",
    authDomain: "tickets-2044e.firebaseapp.com",
    projectId: "tickets-2044e",
    storageBucket: "tickets-2044e.appspot.com",
    messagingSenderId: "179564780502",
    appId: "1:179564780502:web:d431b2704d7453175de277",
    measurementId: "G-SDR9XRQCG9"
};

const firebaseApp = initializeApp(config)

export const auth = getAuth(firebaseApp)
export const db = getFirestoreDB(firebaseApp)
export const storage = getStorage(firebaseApp)