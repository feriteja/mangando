import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { auth, db } from "../firebase";

interface authType {
  email: string;
  password: string;
}

export interface coinDB {
  id: string;
  name: string;
  image: string;
  rank: number;
  symbol: string;
}

export interface userStateContextProps {
  user: User | null;
  logOut: () => Promise<void>;
  signIn: (props: authType) => Promise<User>;
  signUp: (props: authType) => Promise<User>;
  coins: coinDB[];
  setCoins: React.Dispatch<React.SetStateAction<coinDB[]>>;
  deleteCoin: (passId: string) => Promise<void>;
}

const UserContext = createContext<Partial<userStateContextProps>>({});

const AuthContextProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [coins, setCoins] = useState<coinDB[]>([]);

  const signUp = async (props: authType) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        props.email,
        props.password
      );
      await setDoc(doc(db, "users", `${user.user.email}`), {
        watchList: [],
      });
      return user.user;
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

  const logOut = async () => {
    try {
      const user = await signOut(auth);
      setCoins([]);

      return user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw error;
      }
      throw error;
    }
  };

  const coinPath = doc(db, "users", `${user?.email}`);

  const deleteCoin = async (passId: string) => {
    try {
      const result = coins.filter((item: coinDB) => item.id !== passId);
      await updateDoc(coinPath, {
        watchList: result,
      });
    } catch (error) {
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
    const unSubscribe = onSnapshot(
      doc(db, "users", `${user?.email}`),
      (doc: any) => {
        setCoins(doc?.data()?.watchList || []);
      }
    );
    return () => {
      unSubscribe();
    };
  }, [user?.email]);

  return (
    <UserContext.Provider
      value={{ user, signIn, signUp, logOut, coins, setCoins, deleteCoin }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AuthContextProvider;

export const UserAuth = () => {
  return useContext(UserContext);
};
