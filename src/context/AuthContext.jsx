import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

const GoogleProvider = new GoogleAuthProvider();

//auth provider
export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null);
  const [Loading, setLoading] = useState(true);
  // register a user
  const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  // login the user
  const LoginUser = async (email, password)=>{
    return await signInWithEmailAndPassword(auth, email, password);
  }

  // sign in with google
  const signInWithGoogle = async() =>{
    return await signInWithPopup(auth ,GoogleProvider)

  }
    
  // logout user
  const logout = ()=>{
    return signOut(auth)
  }
  // manage user 
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
      setcurrentUser(user);
      setLoading(false);

      if(user){
        const {email, displayName , photoURL } = user;
        const userData = {
          email ,username: displayName , photo : photoURL
        }
      }
    })

    return ()=> unsubscribe();
  }, [])



  const value = {
    currentUser,
    Loading,
    registerUser,
    LoginUser,
    signInWithGoogle,
    logout
    
  };
  return (
    <AuthContext.Provider value={ value }>{children}</AuthContext.Provider>
  );
};
