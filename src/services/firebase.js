import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { 
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  } from 'firebase/firestore';

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
const db = getFirestore(app);
const analytics = getAnalytics(app);

async function sendMessage(roomId, user, text){
  try {
    await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
      uid: user.uid,
      displayName: user.displayName,
      text: text.trim(),
      timestamp: serverTimestamp(),
    });
  } catch (error){
    console.log(error);
  }
}

function getMessages(roomId, callback) {
  return onSnapshot(
    query(
      collection(db, 'chat-rooms', roomId, 'messages'),
      orderBy('timestamp', 'asc')
      ),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    }
  );
}



export { loginWithGoogle, sendMessage, getMessages };