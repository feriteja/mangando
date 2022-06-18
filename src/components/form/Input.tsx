import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IconType } from "react-icons/lib";

interface props {
  label: string;
  Icon: IconType;
  isPassword?: boolean;
  onChange: (text: string) => void;
}

const Input: React.FC<props> = ({
  Icon,
  label,
  isPassword = false,
  onChange,
}) => {
  const [showPass, setShowPass] = useState(!isPassword);

  return (
    <div className="space-y-1">
      <label
        className="after:content-['*'] after:text-red-400"
        htmlFor="username"
      >
        {" "}
        {label}
      </label>
      <div className="flex  bg-primary items-center p-2 w-full shadow-sm rounded-md focus-within:shadow-lg overflow-hidden">
        <Icon size={24} />
        <input
          onChange={(e) => onChange(e.target.value)}
          className="bg-inherit w-full focus:outline-none ml-2"
          type={showPass ? "text" : "password"}
          id="username"
          autoComplete={isPassword ? "new-password" : "on"}
          placeholder="user@mail.com"
        />
        {isPassword &&
          (showPass ? (
            <AiOutlineEye
              onClick={() => setShowPass((prev) => !prev)}
              size={24}
            />
          ) : (
            <AiOutlineEyeInvisible
              onClick={() => setShowPass((prev) => !prev)}
              size={24}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
