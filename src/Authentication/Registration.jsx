import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CiCircleCheck, CiLock } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdOutlineMailLock } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth Provider/AuthContext";
import useAxiosSecure from "../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const SignUp = () => {
  const { createAccount, signInWithGoogle, updateUser, sendEmail } =
    useContext(AuthContext);
  const axios = useAxiosSecure();

  const { register, handleSubmit } = useForm();

  const [showPass, setShowPass] = useState(false);
  const [load, setLoad] = useState(false);
  const [exists, setExists] = useState(false);
  const [pass, setPass] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [long, setLong] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handlePassInput = (e) => {
    const hasUppercase = /[A-Z]/.test(e.target.value);
    const hasLowercase = /[a-z]/.test(e.target.value);
    const hasNumber = /[0-9]/.test(e.target.value);
    const character = /[@!#]/.test(e.target.value);
    const isLongEnough = e.target.value.length >= 6;

    if (hasUppercase) {
      setUppercase(true);
    } else {
      setUppercase(false);
    }

    if (hasNumber) {
      setNumber(true);
    } else {
      setNumber(false);
    }

    if (character) {
      setCharacter(true);
    } else {
      setCharacter(false);
    }

    if (isLongEnough) {
      setLong(true);
    } else {
      setLong(false);
    }

    if ((hasUppercase, hasLowercase, hasNumber, character, isLongEnough)) {
      return setPass(true);
    }
  };

  const onSubmit = (data) => {
    if (!pass) {
      return setError(true);
    }
    if (data.firstName === "" || data.lastName === "" || data.email === "") {
      return setError(true);
    }

    setLoad(true);

    createAccount(data.email, data.password)
      .then((res) => {
        updateUser(data.firstName + " " + data.lastName, null).then(() => {
          axios.post("/users", {
            email: data.email,
            name: data.firstName + " " + data.lastName,
            photoURL: null,
            userRoll: "user",
          });
        });
        sendEmail(res.user).then(() => {
          navigate(location.state ? location.state : "/");
        });
      })

      .catch(() => {
        setExists(true);
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
    document.title = "Sign Up";
  }, []);

  // 740 630 570

  return (
    <div className="pb-24 pt-36 flex justify-center lg:flex-row-reverse flex-col text-white items-center bg-[#eeee]">
      <div className="xl:w-[600px] xl:h-[640px] lg:w-[500px] lg:h-[630px] md:w-[500px] md:h-[400px] w-[350px] h-[310px] flex justify-center items-center flex-col gap-4 bg-gradient-to-l from-[#00ADB5] to-[#229799] shadow-2xl">
        <h1 className="lg:text-5xl text-3xl font-bold">Welcome to Sign Up</h1>
        <p className="lg:text-2xl md:text-xl font-medium">
          Already have an account ?
        </p>
        <Link
          to={"/Login"}
          className="border rounded-3xl px-4 py-2 bg-transparent hover:bg-white hover:text-[#00ADB5] text-lg font-medium transition-all"
        >
          Login
        </Link>
      </div>
      <div className="xl:w-[600px] xl:h-[640px] lg:w-[500px] lg:h-[630px] md:w-[500px] md:h-[570px] w-[350px] h-[570px] bg-white shadow-2xl flex items-center justify-center">
        <div>
          <div className="text-black text-center mb-5 flex justify-center gap-4 w-full items-center">
            <h1 className="md:text-4xl text-2xl">SignUp</h1>
            <span>or</span>
            <button
              className="flex items-center justify-center md:gap-3 md:px-3 md:py-2 border rounded-lg shadow-md hover:bg-gray-100 transition-all disabled:opacity-50 md:text-2xl text-xl gap-1 px-2 py-1"
              onClick={handleGoogleLogin}
              disabled={load}
            >
              <FcGoogle className="" />
              <span className="md:font-medium text-gray-700">
                Google SignUp
              </span>
            </button>
          </div>
          {error && (
            <div className="bg-red-200 text-red-700 p-2 rounded-md border border-red-700 w-[300px] md:w-[350px] lg:w-[400px] mx-auto">
              <p>Please fill up the form</p>
            </div>
          )}
          {exists && (
            <div className="bg-red-200 text-red-700 p-2 rounded-md border border-red-700 w-[145px] md:w-[170px] lg:w-[195px] mx-auto">
              <p>Account with this email already exists</p>
            </div>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 items-center mt-6"
          >
            <div className="flex flex-row lg:gap-[6px] gap-3">
              {" "}
              <input
                {...register("firstName")}
                onChange={() => setError(false)}
                type="text"
                placeholder="First Name"
                className={`input input-bordered w-[145px] md:w-[170px] lg:w-[195px] text-black ${
                  error ? "border-red-700" : ""
                }`}
              />
              <input
                {...register("lastName")}
                onChange={() => setError(false)}
                type="text"
                placeholder="Last Name"
                className={`input input-bordered w-[145px] md:w-[170px] lg:w-[195px] text-black ${
                  error ? "border-red-700" : ""
                }`}
              />
            </div>
            <div className="relative w-[300px] md:w-[350px] lg:w-[400px]">
              {" "}
              <input
                {...register("email")}
                onChange={() => setError(false)}
                type="email"
                placeholder="Enter your email address"
                className={`input input-bordered w-full pl-10 text-black ${
                  error || exists ? "border-red-700" : ""
                }`}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MdOutlineMailLock className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="relative w-[300px] md:w-[350px] lg:w-[400px]">
              {" "}
              <input
                {...register("password")}
                onChange={() => setError(false)}
                onInput={handlePassInput}
                type={showPass ? "text" : "password"}
                placeholder="Enter your Password"
                className={`input input-bordered w-full pl-10 text-black ${
                  error ? "border-red-700" : ""
                }`}
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
                <CiLock className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <div className="mb-6 md:text-sm text-xs space-y-3 font-medium md:px-16 px-6">
                <h1
                  className={`flex items-center gap-1 ${
                    long ? "text-green-500" : "text-gray-400  "
                  }`}
                >
                  <CiCircleCheck />{" "}
                  <span>Password must be at least 6 characters long</span>
                </h1>
                <h1
                  className={`flex items-center gap-1 ${
                    uppercase ? "text-green-500" : "text-gray-400  "
                  }`}
                >
                  <CiCircleCheck />{" "}
                  <span>Password must contain capital letters</span>
                </h1>
                <h1
                  className={`flex items-center gap-1 ${
                    number ? "text-green-500" : "text-gray-400  "
                  }`}
                >
                  <CiCircleCheck /> <span>Password must contain numbers</span>
                </h1>
                <h1
                  className={`flex items-center gap-1 ${
                    character ? "text-green-500" : "text-gray-400  "
                  }`}
                >
                  <CiCircleCheck />{" "}
                  <span>
                    Password must contain any of the following characters @, !,
                    #
                  </span>
                </h1>
              </div>
              <div>
                <div className="flex justify-center">
                  <button className="bg-[#00ADB5] hover:bg-opacity-80 transition-all xl:w-[400px] md:w-[350px] w-[270px] h-12 rounded-xl">
                    {load ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
