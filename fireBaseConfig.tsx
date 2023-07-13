/* eslint-disable @typescript-eslint/no-explicit-any */
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
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { UserDto } from "./src/dto/UsersDto";
import { PersonDto } from "./src/dto/PersonDto";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { NotificationDto } from "./src/dto/NotificationDto";

export const firebaseConfig = {
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

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();

export const storage = getStorage(app);

const colRef = collection(db, "Users");
const colRefPosts = collection(db, "Posts");
const colRefMessages = collection(db, "Messages");

export const users = async () => {
  const users: UserDto[] = [];
  await getDocs(colRef)
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

export const posts = async () => {
  const posts: any = [];
  await getDocs(colRefPosts)
    .then((snapShot) => {
      snapShot.docs.forEach((doc) => {
        const postData = doc.data() as any;
        const post = { id: doc.id, ...postData };
        posts.push(post);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
  return posts;
};

export const getAllUsers = async () => {
  const usersArr: any = [];
  await getDocs(colRef)
    .then((snapShot) => {
      snapShot.docs.forEach((doc) => {
        const usersData = doc.data() as any;
        const users = { id: doc.id, ...usersData };
        usersArr.push(users);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
  return usersArr;
};

export const oneUser = async (id: string) => {
  const q = query(colRef, where("userId", "==", id));
  const users: PersonDto[] = [];
  await getDocs(q)
    .then((snapShot) => {
      snapShot.docs.forEach((doc) => {
        const userData = doc.data() as PersonDto;
        const user: PersonDto & dtoId = { id: doc.id, ...userData };
        users.push(user);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
  return users;
};

export const oneNotification = async (id: string, comparison: string) => {
  const colRef = collection(db, "Notifications");
  const q = query(colRef, where(comparison, "==", id));
  const notifications: NotificationDto[] = [];
  await getDocs(q)
    .then((snapShot) => {
      snapShot.docs.forEach((doc) => {
        const notificationsData = doc.data() as NotificationDto;
        const notification: NotificationDto = {
          id: doc.id,
          ...notificationsData,
        };
        notifications.push(notification);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
  return notifications;
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

export const addNotification = (
  notificationText: string,
  type: string,
  ownerId: string | undefined,
  senderId: string,
  senderName: string,
  profilePhoto: string
) => {
  const colRef = collection(db, "Notifications");
  addDoc(colRef, {
    clicked: false,
    description: notificationText,
    notificationType: type,
    ownerId: ownerId,
    senderId: senderId,
    senderName: senderName,
    createdAt: serverTimestamp(),
    profilePhoto: profilePhoto,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const addPost = (
  ownerName: string,
  url: any,
  description: string,
  id: string,
  postAuthorImg: any
) => {
  addDoc(colRefPosts, {
    name: ownerName,
    postPhoto: url,
    title: description,
    userId: id,
    url: postAuthorImg,
    createdAt: serverTimestamp(),
    reactions: 0,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const addMessage = (
  description: string,
  senderId: string,
  receiverId: string | undefined,
  profilePhoto: string | undefined,
  nameAndSurname: string
) => {
  addDoc(colRefMessages, {
    message: description,
    senderId: senderId,
    receiverId: receiverId,
    createdAt: serverTimestamp(),
    profilePhoto: profilePhoto,
    name: nameAndSurname,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const deleteUser = (userId: string) => {
  const docRef = doc(db, "Users", userId);
  deleteDoc(docRef).then((response) => {
    console.log(response);
  });
};

export const deletePost = (postId: string) => {
  const docRef = doc(db, "Posts", postId);
  deleteDoc(docRef).then((response) => {
    console.log(response);
  });
};

export const deleteNotification = (NotificationId: string) => {
  const docRef = doc(db, "Notifications", NotificationId);
  deleteDoc(docRef).then((response) => {
    console.log(response);
  });
};

export const updatePost = (postId: string, numberOfLikes: number) => {
  const docRef = doc(db, "Posts", postId);
  updateDoc(docRef, {
    reactions: numberOfLikes,
  }).then((response) => {
    console.log(response);
  });
};

export const updateNotification = async (
  userId: string,
  newFriendId: string
) => {
  const colRef = collection(db, "Users");
  const q = query(colRef, where("userId", "==", userId));
  const users: PersonDto[] = [];
  await getDocs(q)
    .then((snapShot) => {
      snapShot.docs.forEach((doc) => {
        const usersData = doc.data() as PersonDto;
        const user: PersonDto = {
          id: doc.id,
          ...usersData,
        };
        users.push(user);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });

  if (users.length > 0) {
    const userId = users[0].id ? users[0].id : "";
    const usersFriendList = users[0].friendsList ? users[0].friendsList : [];
    usersFriendList.push(newFriendId);
    const docRef = doc(db, "Users", userId);
    updateDoc(docRef, {
      friendsList: usersFriendList,
    }).then((response) => {
      console.log(response);
    });
  }
};

export const createUser = async (
  email: string,
  password: string,
  name: string,
  surname: string
) => {
  let userResponse: any;
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
    userId: userResponse.uid,
    coverPhoto: "",
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
