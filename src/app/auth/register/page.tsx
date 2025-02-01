"use client";
import LayoutAuth from "@/components/Layout/LayoutAuth";
import FormRegister from "./form-register";

const Register = () => {
  return (
    <LayoutAuth>
      <div className="h-screen flex justify-center mt-5 items-center dark:bg-gray-800">
        <FormRegister />
      </div>
    </LayoutAuth>
  );
};

export default Register;
