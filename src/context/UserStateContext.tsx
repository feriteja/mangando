import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { signInWithPopup } from "firebase/auth";
import { auth, db, faceBookProvider, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { newUserDbHandler } from "../services/firebaseService";

interface authType {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface coinDB {
  id: string;
  name: string;
  image: string;
  rank: number;
  symbol: string;
}

export interface UserMangaFav {
  endpoint: string;
  title: string;
  thumb: string;
}

export interface userStateContextProps {
  user: User | null;
  logOut: () => Promise<void>;
  signIn: (props: authType) => Promise<User>;
  signByGoogle: (isNewUser: boolean) => Promise<UserCredential>;
  signByFacebook: (isNewUser: boolean) => Promise<UserCredential>;
  signUp: (props: authType) => Promise<User>;
  addToFav: (props: UserMangaFav) => Promise<void>;
  deleteFromFav: (props: UserMangaFav) => Promise<void>;
  mangaList: UserMangaFav[];
}

const UserContext = createContext<Partial<userStateContextProps>>({});

const AuthContextProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [mangaList, setMangaList] = useState<UserMangaFav[]>([]);
  const navigate = useNavigate();

  const userMangaPath = doc(
    db,
    "users",
    `${user?.email}`,
    "application",
    "mangando"
  );

  const signUp = async (props: authType) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        props.email,
        props.password
      );
      await newUserDbHandler(res.user.email || "");

      return res.user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw error;
      }
      throw error;
    }
  };

  const signIn = async (props: authType) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        props.email,
        props.password
      );

      return user.user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw error;
      }
      throw error;
    }
  };

  const signByGoogle = async (isNewUser: boolean) => {
    try {
      const user = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(user);
      const token = credential?.accessToken;
      if (isNewUser) await newUserDbHandler(user.user.email || "");

      return user;
    } catch (error) {
      throw error;
    }
  };

  const signByFacebook = async (isNewUser: boolean) => {
    try {
      const user = await signInWithPopup(auth, faceBookProvider);
      const credential = FacebookAuthProvider.credentialFromResult(user);
      const token = credential?.accessToken;
      if (isNewUser) await newUserDbHandler(user.user.email || "");

      return user;
    } catch (error) {
      throw error;
    }
  };

  const logOut = async () => {
    try {
      const user = await signOut(auth);
      setMangaList([]);
      navigate("/");

      return user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw error;
      }
      throw error;
    }
  };

  const addToFav = async (props: UserMangaFav) => {
    try {
      await updateDoc(userMangaPath, {
        myFavorite: arrayUnion({ ...props }),
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw error;
      }
      throw error;
    }
  };

  const deleteFromFav = async (props: UserMangaFav) => {
    try {
      await updateDoc(userMangaPath, {
        myFavorite: arrayRemove({ ...props }),
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw error;
      }
      throw error;
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  useEffect(() => {
    const unSubscribe = onSnapshot(userMangaPath, (doc: any) => {
      setMangaList(doc?.data()?.myFavorite || []);
    });
    return () => {
      unSubscribe();
    };
  }, [user?.email]);

  return (
    <UserContext.Provider
      value={{
        user,
        signIn,
        signByGoogle,
        signByFacebook,
        signUp,
        logOut,
        addToFav,
        deleteFromFav,
        mangaList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AuthContextProvider;

export const UserState = () => {
  return useContext(UserContext);
};
