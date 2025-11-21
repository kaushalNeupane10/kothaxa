import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}rooms/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.detail || "Login failed");
        return;
      }

      // Save token
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      toast.success("Login successful!");
      navigate("/home");
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
      <div className="w-[530px] h-[400px] bg-[#DCE2EF]  rounded-[24px] ">
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="enter your email"
            className="w-[452px] h-[60px] mt-20 m-[30px] rounded-[12px] p-[24px] text-[18px] outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-[452px] h-[60px] mt-1 m-[30px] rounded-[12px] p-[24px] text-[18px] outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-[450px] h-[48px] mt-5 m-[30px]  border-[1px] bg-[#4D5BCE] rounded-[12px] text-white text-[20px] font-semibold hover:bg-[#e0e4f9] transition-colors flex items-center justify-center   "
          >
            Log In
          </button>
          <div className="flex items-center justify-between w-[450px]  mt-2 ml-10">
            <Link
              to="/forgot"
              className="text-[#4D5BCE] text-[16px] font-semibold"
            >
              Forget Password?
            </Link>

            <Link
              to="/signup"
              className="text-[#4D5BCE] text-[16px] font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;