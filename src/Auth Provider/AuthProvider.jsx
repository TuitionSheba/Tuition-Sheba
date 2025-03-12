import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  browserSessionPersistence,
  browserLocalPersistence,
  setPersistence,
  sendEmailVerification,
} from "firebase/auth";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import auth from "../Firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const createAccount = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const updateUser = (displayName, PhotoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: PhotoURL || null,
    });
  };

  const signInWithPass = (email, pass, stayLogIn) => {
    setLoading(true);
    setPersistence(
      auth,
      stayLogIn ? browserLocalPersistence : browserSessionPersistence
    );
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const sendEmail = (user) => {
    setLoading(true);
    return sendEmailVerification(user);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const AuthInfo = {
    user,
    loading,
    createAccount,
    updateUser,
    signInWithGoogle,
    signInWithPass,
    sendEmail,
    logOut,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log(user);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);
  return (
    <div>
      <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
