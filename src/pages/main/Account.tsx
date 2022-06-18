import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardManga } from "../../components";
import {
  UserState,
  userStateContextProps,
} from "../../context/UserStateContext";

const Account = () => {
  const { user, logOut, mangaList } = UserState() as userStateContextProps;
  const navigation = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
      navigation("/");
    } catch (error) {}
  };

  useEffect(() => {
    if (!user) navigation("/signin");
  }, [user]);

  return (
    <div className="w-full max-w-[1140px] mx-auto">
      <div className="flex justify-between items-center my-7 py-4 px-4   rounded-div">
        <div>
          <h1 className="text-2xl font-bold">Account</h1>
          <div>
            <p>Wellcome, {user?.email}</p>
          </div>
        </div>
        <div>
          <button
            onClick={handleSignOut}
            className="border rounded-2xl px-6 py-2 shadow-lg hover:shadow-2xl"
          >
            Sign Out
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center my-8 py-2 px-2 rounded-div">
        <div className="w-full min-h-[300px]">
          <h1 className="text-2xl font-bold py-4">My Favorite</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {mangaList.map((manga, idx) => {
              return (
                <CardManga
                  key={manga.endpoint + "fav"}
                  thumb={manga.thumb}
                  name={manga.title}
                  endpoint={`komik/${manga.endpoint}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
