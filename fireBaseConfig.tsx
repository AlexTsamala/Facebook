import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { UserDto } from "./src/dto/UsersDto";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8vnnCw4qF-_3X7mwkcFl5remrbfzffco",
  authDomain: "facebook-b3e85.firebaseapp.com",
  projectId: "facebook-b3e85",
  storageBucket: "facebook-b3e85.appspot.com",
  messagingSenderId: "138370366101",
  appId: "1:138370366101:web:d12e1007835e3067d8b99c",
};

interface dtoId {
  id: string;
}

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const colRef = collection(db, "Users");

export const users = await getDocs(colRef)
  .then((snapShot) => {
    const users: UserDto[] = [];
    snapShot.docs.forEach((doc) => {
      const userData = doc.data() as UserDto;
      const user: UserDto & dtoId = { id: doc.id, ...userData };
      users.push(user);
    });
    return users;
  })
  .catch((err) => {
    console.log(err.message);
  });

export const oneUser = async (email: string) => {
  const q = query(colRef, where("email", "==", email));
  const users: UserDto[] = [];
  await getDocs(q)
    .then((snapShot) => {
      snapShot.docs.forEach((doc) => {
        const userData = doc.data() as UserDto;
        const user: UserDto & dtoId = { id: doc.id, ...userData };
        users.push(user);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
  return users;
};

export const addUser = () => {
  addDoc(colRef, {
    name: "ნინი",
    surname: "ერგემლიძე",
    email: "test5@gmail.com",
  }).then((response) => {
    console.log(response);
  });
};

export const deleteUser = (userId: string) => {
  const docRef = doc(db, "Users", userId);
  deleteDoc(docRef).then((response) => {
    console.log(response);
  });
};

export const createUser = async (
  email: string,
  password: string,
  name: string,
  surname: string
) => {
  let userResponse;
  let errorStatus;
  let errorMessage;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user created:", cred.user);
      userResponse = cred.user;
      errorStatus = false;
    })
    .catch((err) => {
      console.log(err.message);
      errorMessage = err.message;
      errorStatus = true;
    });

  await addDoc(colRef, {
    name: name,
    surname: surname,
    email: email,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err.message);
    });
  return { errorStatus, userResponse, errorMessage };
};

export const signOutUser = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const signInUser = async (email: string, password: string) => {
  let logInStatus;
  let errorMessage;
  let userData;
  await signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user logged in :", cred.user);
      userData = cred.user;
      logInStatus = true;
    })
    .catch((err) => {
      console.log(err.message);
      errorMessage = err.message;
      logInStatus = false;
    });
  return { logInStatus, errorMessage, userData };
};
