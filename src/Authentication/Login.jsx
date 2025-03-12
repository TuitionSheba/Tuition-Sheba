import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CiLock } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdOutlineMailLock } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth Provider/AuthContext";
import useAxiosSecure from "../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const Login = () => {
  const axios = useAxiosSecure();
  const { signInWithPass, signInWithGoogle } = useContext(AuthContext);

  const { register, handleSubmit } = useForm();

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState({ boo: false, message: "" });
  const [load, setLoad] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => {
    if (data.email === "" || data.password === "") {
      return setError({
        boo: true,
        message: "Please enter your email and password",
      });
    }
    const checkbox = document.querySelector("input[name=stayLogIn]");

    setLoad(true);

    signInWithPass(data.email, data.password, checkbox.checked)
      .then(() => {
        navigate(location.state ? location.state : "/");
      })
      .then(() => {
        Swal.fire({
          position: "center",
          title: "Welcome Back",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        setLoad(false);
        setError({ boo: true, message: "Incorrect email or password" });
        return;
      });
  };

  const handleGoogleLogin = () => {
    setLoad(true);
    signInWithGoogle()
      .then((res) => {
        axios
          .post("/users", {
            email: res.user?.email,
            name: res.user?.displayName,
            photoURL: res.user?.photoURL,
            userRoll: "user",
          })
          .then((res) => {
            if (res.acknowledged) {
              navigate(location.state ? location.state : "/");
            }
          })
          .then(() => {
            Swal.fire({
              position: "center",
              title: "Welcome To Tuition Sheba",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      })
      .then(() => {
        navigate(location.state ? location.state : "/");
      })
      .then(() => {
        Swal.fire({
          position: "center",
          title: "Welcome Back",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        setLoad(false);
        setError({ boo: true, message: "Login Failed" });
      });
  };

  useEffect(() => {
    document.title = "Login Page";
  }, []);

  return (
    <div className="pb-24 pt-36 flex justify-center lg:flex-row flex-col text-white items-center bg-[#EEEEEE]x">
      <div className="xl:w-[600px] xl:h-[600px] lg:w-[500px] lg:h-[400px] md:w-[500px] md:h-[400px] w-[350px] h-[310px] flex justify-center items-center flex-col gap-4 bg-gradient-to-l from-[#00ADB5] to-[#229799] shadow-2xl">
        <h1 className="lg:text-5xl text-3xl text-center font-bold">
          Welcome to Login
        </h1>
        <p className="lg:text-2xl md:text-xl font-medium">
          Don&apos;t have an account with us ?
        </p>
        <Link
          to={"/Sign-Up"}
          className="border rounded-3xl px-4 py-2 bg-transparent hover:bg-white hover:text-[#00ADB5] text-lg font-medium transition-all"
        >
          Sign Up
        </Link>
      </div>
      <div className="xl:w-[600px] lg:w-[500px] xl:h-[600px] md:w-[500px] md:h-[400px] w-[350px] h-[350px] bg-white shadow-2xl flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 items-center xl:mt-6"
        >
          <div className="text-black text-center mb-5 flex justify-center gap-4 w-full items-center">
            <h1 className="md:text-4xl text-2xl">Login</h1>
            <span>or</span>
            <button
              className="flex items-center justify-center md:gap-3 md:px-3 md:py-2 border rounded-lg shadow-md hover:bg-gray-100 transition-all disabled:opacity-50 md:text-2xl text-xl gap-1 px-2 py-1"
              onClick={handleGoogleLogin}
              disabled={load}
            >
              <FcGoogle className="" />
              <span className="md:font-medium text-gray-700">Google Login</span>
            </button>
          </div>
          {error.boo && (
            <div className="bg-red-200 text-red-700 p-2 rounded-md border border-red-700 md:w-[350px] xl:w-[400px] mx-auto xl:block -mt-5">
              <p>{error.message}</p>
            </div>
          )}
          <div className="relative md:w-[350px] xl:w-[400px] w-[270px]">
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email address"
              className={`input input-bordered w-full pl-10 text-black ${
                error.boo ? "border-red-700" : ""
              }`}
              onChange={() => setError(false)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdOutlineMailLock
                className={`h-5 w-5 text-gray-400 ${
                  error.boo ? "text-red-700" : ""
                }`}
              />
            </div>
          </div>
          <div className="relative md:w-[350px] xl:w-[400px] w-[270px]">
            {" "}
            <input
              {...register("password")}
              type={showPass ? "text" : "password"}
              placeholder="Enter your Password"
              className={`input input-bordered w-full pl-10 text-black ${
                error.boo ? "border-red-700" : ""
              }`}
              onChange={() => setError(false)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
              {showPass ? (
                <IoEyeOffOutline
                  onClick={() => setShowPass(!showPass)}
                  className="h-5 w-5 text-gray-400"
                />
              ) : (
                <IoEyeOutline
                  onClick={() => setShowPass(!showPass)}
                  className="h-5 w-5 text-gray-400"
                />
              )}
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CiLock
                className={`h-5 w-5 text-gray-400 ${
                  error.boo ? "text-red-700" : ""
                }`}
              />
            </div>
          </div>
          <div className="flex items-center justify-between md:w-[350px] xl:w-[400px] md:gap-0 gap-9 w-[270px]">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="stayLogIn"
                className="checkbox w-[20px] h-[20px] -mt-1"
              />
              <label className="md:text-sm text-xs ml-2 text-black">
                Remember me
              </label>
            </div>
            <a className="md:text-sm text-xs text-blue-500">Forgot Password?</a>
          </div>
          <button className="bg-[#00ADB5] hover:bg-opacity-80 transition-all xl:w-[400px] md:w-[350px] w-[270px] h-12 rounded-xl">
            {load ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
