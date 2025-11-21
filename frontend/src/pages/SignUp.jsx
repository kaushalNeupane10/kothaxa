import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const API = import.meta.env.VITE_BACKEND_URL;

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}rooms/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username: userName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }

      toast.success("Signup successful!");
      navigate("/login");

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen w-full bg-cover bg-center p-5"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1689263131930-c938ae8bf1ec?q=80&w=1156&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      <div className="w-full max-w-[600px] bg-[#DCE2EF] rounded-[24px] p-6 sm:p-10">
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full h-[60px] mt-6 rounded-[12px] p-[20px] text-[18px] outline-none"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full h-[60px] mt-4 rounded-[12px] p-[20px] text-[18px] outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full h-[60px] mt-4 rounded-[12px] p-[20px] text-[18px] outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full h-[50px] mt-6 bg-[#4D5BCE] rounded-[12px] text-white text-[20px] font-semibold hover:bg-[#3b47a1] transition-colors"
          >
            Sign Up
          </button>
        </form>

        {/* Already have account */}
        <div className="text-center mt-4">
          <span className="text-[15px] text-black">
            Already have an account?{" "}
            <Link to="/login" className="text-[#4D5BCE] font-semibold">
              Login
            </Link>
          </span>
        </div>

        {/* Google login */}
        <p className="text-center mt-6 text-black text-[16px] font-semibold">
          or, continue with
        </p>

        <button className="w-full h-[48px] mt-4 border border-[#4D5BCE] rounded-[12px] text-[#3356AA] text-[20px] font-semibold hover:bg-[#e0e4f9] transition-colors flex items-center justify-center gap-3">
          <FcGoogle className="text-3xl" />
          Google
        </button>
      </div>
    </div>
  );
}

export default SignUp;