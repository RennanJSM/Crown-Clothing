import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBwBHq3MlIZYQc3qjwEsH1v4YbHd0QyP9g",
    authDomain: "crown-clothing-db-d408e.firebaseapp.com",
    projectId: "crown-clothing-db-d408e",
    storageBucket: "crown-clothing-db-d408e.appspot.com",
    messagingSenderId: "314102466242",
    appId: "1:314102466242:web:340d12d5ece2b443185d5b"
  };
  

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => (signInWithPopup(auth, provider));


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {

  const userDocRef = doc(db, 'user', userAuth.uid)
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists())



if (!userSnapshot.exists()) {
  const { displayName, email } = userAuth;
  const createdAt = new Date();


  try {
    await setDoc(userDocRef, {
      displayName,
      email, 
      createdAt
    })
  }
  catch (error) {
    console.log('error creating the user', error.message)
  }}
}

