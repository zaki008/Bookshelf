import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Title from "@/ui/Title";
import { schemaLogin } from "@/utils/ValidationSchema";
import { Formik } from "formik";
import Link from "next/link";

const FormLogin = () => {
  return (
    <div className="w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Title type="form">Login</Title>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={schemaLogin}
        onSubmit={(values, { setSubmitting }) => {
          console.log("submit");
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,

          /* and other goodies */
        }) => {
          return (
            <form className="w-full mx-auto" onSubmit={handleSubmit}>
              <Input
                title="Email"
                type="text"
                name="email"
                placeholder="Input Your Email"
                value={values.email}
                error={errors.email && touched.email ? errors.email : ""}
                onChange={handleChange}
              />
              <Input
                title="Password"
                type="password"
                placeholder="Input Your Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                error={
                  errors.password && touched.password ? errors.password : ""
                }
              />
              <Button title={"Submit"} type="submit" />
            </form>
          );
        }}
      </Formik>

      <Link
        href="/auth/register"
        className="mt-3 inline-flex font-medium items-center text-blue-600 hover:underline text-xs"
      >
        Belum Punya Akun ? Daftar
        <svg
          className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        ></svg>
      </Link>
    </div>
  );
};

export default FormLogin;
