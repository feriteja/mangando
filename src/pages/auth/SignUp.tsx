import React, { SyntheticEvent, useState } from "react";
import { AiFillGoogleCircle, AiFillTwitterCircle } from "react-icons/ai";
import { BiLockAlt, BiUser } from "react-icons/bi";
import { BsFacebook } from "react-icons/bs";
import { InputForm } from "../../components";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div className=" min-h-screen justify-center items-center  ">
      <div className=" w-3/4 md:w-full max-w-2xl px-4 pt-8 pb-5 mt-10 mx-auto rounded-md shadow-xl ">
        <h1 className=" text-xl font-bold text-center mb-10">Sign Up</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <InputForm
            onChange={(text) => setUserName(text)}
            label="Username or Email Address"
            Icon={BiUser}
          />
          <InputForm
            onChange={(text) => setPassword(text)}
            label="Password"
            Icon={BiLockAlt}
            isPassword
          />
          <InputForm
            onChange={(text) => setConfPassword(text)}
            label="Confirm Password"
            Icon={BiLockAlt}
            isPassword
          />
          <div className="h-3" />
          <input
            className="bg-button text-btnText w-full rounded-lg py-2 mt-8 font-bold "
            type="submit"
            value={"Sign Up"}
          />
        </form>
      </div>
      <div className="  w-full max-w-lg  mt-6  mx-auto space-y-4 ">
        <p className="text-center opacity-90 ">or Sign Up using</p>
        <div className="flex items-center justify-center space-x-10">
          <BsFacebook className="text-[#3D5892]" size={35} />
          <AiFillGoogleCircle className="text-[#D56455]" size={40} />
          <AiFillTwitterCircle className="text-[#4CA0ED]" size={40} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
