import { useContext } from "react";
import { AuthContext } from "../Auth Provider/AuthContext";
import Swal from "sweetalert2";

const VerifyEmail = () => {
  const { user, sendEmail } = useContext(AuthContext);

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md max-w-md mx-auto my-8">
      <div className="flex">
        <div className="py-1">
          <svg
            className="fill-current h-6 w-6 text-yellow-500 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11h-2v6h2V7zm-1 4a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </div>
        <div>
          <p className="font-bold">Verify Your Email Address</p>
          <p className="text-xs">
            Please check your inbox for a verification email. If Email is not
            verified in 3 days, your account will be deleted
          </p>
          <button
            className="mt-2 bg-yellow-500 hover:bg-yellow-600 transition-all text-white font-bold py-2 px-4 rounded text-sm"
            onClick={() => {
              sendEmail(user).then(() => {
                Swal.fire({
                  title: "Code has been sent",
                  text: "Click here to go to your gmail",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Go to gmail",
                }).then((res) => {
                  if (res.isConfirmed) {
                    open(
                      "https://mail.google.com/mail/u/0/#inbox",
                      "_blank",
                      "rel=noopener noreferrer"
                    );
                  }
                });
              });
            }}
          >
            Resend Verification Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
