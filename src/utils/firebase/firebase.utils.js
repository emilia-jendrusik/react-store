import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDVMnsIKThB62fBCsu9iysK4h34tembzVs",
  authDomain: "crown-clothing-ej.firebaseapp.com",
  projectId: "crown-clothing-ej",
  storageBucket: "crown-clothing-ej.appspot.com",
  messagingSenderId: "1032848293691",
  appId: "1:1032848293691:web:7c1cd39ab304568797811e"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account"
})

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
    if(!userAuth) return
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
          await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInfo
          })
        } catch (error) {
          console.log('error creating user', error.message);
        }
      }
      return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password);
}