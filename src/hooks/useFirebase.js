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
import { useEffect, useState } from "react";
import initAuth from "../Firebase/firebase.init";
initAuth();
const useFirebase = () => {
  const auth = getAuth();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const logInUsingGoogle = (history, location) => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        saveUser(user.email, user.displayName, "PUT");
        console.log(result.user);
      })
      .then(() => {
        const destination = location?.state?.from || "/";
        history.replace(destination);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const signUpWithEmailAndPassword = (email, password, name, history) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        saveUser(email, name, "POST");
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        history.replace("/");

        console.log(result.user);
      })

      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => setIsLoading(false));
  };
  const emailAndPasswordSignIn = (email, password, location, history) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Signed in
        // ...
        // console.log(result);

        const destination = location?.state?.from || "/";
        history.replace(destination);

        console.log(result.user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };
  //fetching all the admins from the database
  useEffect(() => {
    fetch(`http://localhost:5000/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [user.email]);

  console.log(admin);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        // User is signed out
        // ...
        setUser({});
      }
      setIsLoading(false);
    });
  }, [auth]);

  const saveUser = (email, displayName, method) => {
    const user = { email, displayName };
    console.log(`I am ${email}`);
    fetch("http://localhost:5000/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  return {
    logInUsingGoogle,
    signUpWithEmailAndPassword,
    admin,
    emailAndPasswordSignIn,
    logOut,
    user,
    setUser,
    isLoading,
  };
};
export default useFirebase;
