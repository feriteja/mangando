import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

interface UserInputType {
  username: string;
  password: string;
  confirmPassword?: string;
}

const signUpUser = async (userInput: UserInputType) => {
  if (userInput.password !== userInput.confirmPassword) {
    throw "Password and Confirm Password doesn't match";
  }
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      userInput.username,
      userInput.password
    );
    const userPath = doc(db, "users", `${res.user.email}`);
    await setDoc(userPath, {
      username: res.user.email,
    });
    const userMangaPath = doc(
      db,
      "users",
      `${res.user.email}`,
      "application",
      "mangando"
    );
    await setDoc(userMangaPath, {
      myFavorite: [],
    });
    return res.user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw error;
    }
    throw error;
  }
};

export { signUpUser };
