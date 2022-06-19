import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const newUserDbHandler = async (email = "anonymous") => {
  try {
    const userPath = doc(db, "users", `${email}`);
    await setDoc(userPath, {
      username: email,
    });
    const userMangaPath = doc(
      db,
      "users",
      `${email}`,
      "application",
      "mangando"
    );
    await setDoc(userMangaPath, {
      myFavorite: [],
    });
  } catch (error) {}
};

export { newUserDbHandler };
