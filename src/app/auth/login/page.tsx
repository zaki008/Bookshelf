import Header from "@/components/Header";
import FormLogin from "./form-login";

const Login = () => {
  return (
    <div className={`dark`}>
      <Header />
      <div className="h-screen flex justify-center items-center dark:bg-gray-800">
        <FormLogin />
      </div>
    </div>
  );
};

export default Login;
