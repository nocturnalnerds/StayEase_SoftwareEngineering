import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import { API } from "../lib/API";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import googleIcon from "/icons/google.svg";
import "../styles/loginSignup.css";

type LoginFields = {
  email: string;
  password: string;
};

const inputStyle =
  "border-[#dbdee3] px-3.5 py-3 text-blacky bg-[#f7fbff] placeholder-[#8897ad] focus:border-primary rounded-xs";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFields>();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    try {
      const loginData: LoginFields = {
        email: data.email,
        password: data.password,
      };
      await API.post("/login", loginData);
      toast.success("Login successful!");
    } catch (err) {
      console.error("Form submission error", err);
      toast.error("Login failed!");
      setError("email", { message: "An error occurred" });
    }
  };

  return (
    <section className="login container transition-all duration-300">
      <div className="login-card flex gap-4 pt-[80px]">
        <div className="left w-full md:w-2/5">
          <div className="title mb-[50px]">
            <h1 className="text-primary font-bold text-[40px] mt-3">
              Welcome StayEaser!
            </h1>
            <p className="text-primary text-[18px]">
              Start your vacation with us!
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("email", { required: "Email is required" })}
              label="Email"
              type="email"
              placeholder="john.doe@example.com"
              className="mb-6"
              inputClassName={inputStyle}
              errorMessage={errors.email?.message}
            />
            <div className="relative mb-4">
              <Input
                {...register("password", {
                  required: "Password field is required",
                })}
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="************"
                className="mb-6"
                inputClassName={inputStyle}
                errorMessage={errors.password?.message}
              />
              <button
                type="button"
                className="absolute right-5 top-11 text-2xl cursor-pointer text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
            <button
              className="mt-10 flex cursor-pointer text-white font-semibold justify-center w-full items-center px-2.5 py-3 rounded-lg bg-[#213555] hover:bg-[#1a2a44] transition-colors duration-300"
              type="submit"
            >
              Log In
            </button>
          </form>

          <div className="flex items-center my-2">
            <hr className="w-full border-border border-[#CFDFE2]" />
            <p className="text-light p-[1rem] text-[#294957]">or</p>
            <hr className="w-full border-border border-[#CFDFE2]" />
          </div>

          <button className="flex items-center w-full justify-center gap-2 rounded-lg bg-slate-100 hover:bg-slate-200 py-3 duration-300 cursor-pointer">
            <img
              src={googleIcon}
              alt="google icon"
              className="w-[28px]! h-[28px]!"
            />
            <p className="text-paragraph">
              Log in with <span className="font-semibold">Google</span>
            </p>
          </button>

          <div className="flex justify-center mt-6">
            <p className="text-blacky font-medium">
              Don't have an account?
              <Link
                to="/signup"
                className="text-secondary! ml-2 underline hover:text-primary! hover:underline! duration-300"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        <div className="right w-full h-full md:w-3/5">
          <div className="login-skewed"></div>
        </div>
      </div>
    </section>
  );
}
