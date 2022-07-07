import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAyQc3sNavFXnHdvag4oNVN6BtGVW_o7iw",
  authDomain: "chat-room-fbcb7.firebaseapp.com",
  projectId: "chat-room-fbcb7",
  storageBucket: "chat-room-fbcb7.appspot.com",
  messagingSenderId: "990838934197",
  appId: "1:990838934197:web:fa7080744e661731314cfc",
  measurementId: "G-X3YB892MH1"
};

async function loginWithGoogle(){
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const { user } = await signInWithPopup(auth, provider);
    return { uid: user.uid, displayName: user.displayName };
  }
  catch(error){
    if (error.code !== 'auth/cancelled-popup-request') {
      console.error(error);
    }
    return null;
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { loginWithGoogle };