import React, { createContext, useEffect, useState }  from 'react';
import { app } from '../../firebase.config';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";





export  const authContext = createContext() // creat context api
const auth = getAuth(app)  // firebase auth

const AuthProvider = ({children}) => {

const [user,setUser] = useState('');
const  [loading,setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

console.log(user);




// firebase observer 

useEffect(() => {
       const unsubscribe =  onAuthStateChanged(auth,(currentUser) => {
                setUser(currentUser);
                setLoading(false);

                return () => {
                      return unsubscribe();
                }
       })
}, [])





// firebase sign up
  const creatUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

//    firebase log in

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

    // google logIn system

  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };


   // update profile 
    const updateUserProfile = (name,photoUrl) => {
return updateProfile(auth.currentUser , {
    displayName : name,
    photoURL : photoUrl
})
    }

    // user  log out

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };







    //***  context value
    const authInfo = {
            user ,
            loading,
            creatUser,
            logIn,
            googleLogIn,
            updateUserProfile,
            logOut
    }


    return (
        <authContext.Provider value={authInfo}>
              {children}
        </authContext.Provider>
    );
};

export default AuthProvider;