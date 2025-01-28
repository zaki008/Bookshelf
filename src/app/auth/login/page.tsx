"use client";

import Header from "@/components/Header";
import DarkMode from "@/ui/DarkMode";
import FormLogin from "./form-login";

const Login = () => {
  return (
    <DarkMode>
      <Header />
      <div className="h-screen flex justify-center items-center dark:bg-gray-800">
        <FormLogin />
      </div>
    </DarkMode>
  );
};

export default Login;
