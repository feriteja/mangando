import React, { useState } from "react";
import { BiLockAlt, BiUser } from "react-icons/bi";
import { InputForm } from "../../components";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  return (
    <div className=" min-h-screen justify-center items-center  ">
      <div className=" w-3/4 md:w-full max-w-2xl px-4 py-12 mt-20 mx-auto rounded-md shadow-xl ">
        <h1 className=" text-xl font-bold text-center mb-10">Sign Up</h1>
        <div>
          <form className="space-y-4" method="post">
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
