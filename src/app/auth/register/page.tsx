"use client";
import Header from "@/components/Header";
import DarkMode from "@/ui/DarkMode";
import { useDispatch } from "react-redux";
import FormRegister from "./form-register";

const Register = () => {
  const dispatch = useDispatch();
  return (
    <DarkMode>
      <Header />
      <div className="h-screen flex justify-center items-center dark:bg-gray-800">
        <FormRegister />
      </div>
    </DarkMode>
  );
};

export default Register;
