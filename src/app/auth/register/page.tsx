import Header from "@/components/Header";
import FormRegister from "./form-register";

const Register = () => {
  return (
    <div className={`dark`}>
      <Header />
      <div className="h-screen flex justify-center items-center dark:bg-gray-800">
        <FormRegister />
      </div>
    </div>
  );
};

export default Register;
