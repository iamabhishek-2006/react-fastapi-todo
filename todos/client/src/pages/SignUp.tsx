import { Eye, EyeClosed } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [formData,setFormData]=useState({name:"",email:"",password:"",confirm_password:""})
    const [loading,setLoading]=useState(false);
    const [showPassword,setShowPassword]=useState(false)
    const navigate=useNavigate();

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      const eleName=e.target.name;
      const eleValue=e.target.value
      setFormData({...formData,[eleName]: eleValue });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();

        if (!data.success) {
          console.error("Error adding signup:", data.message);
          return;
        }
        navigate("/")
        //  window.location.href = "/signIn";
        } catch (error) {
          console.error("Error adding signup:", error);
        }finally{
          setLoading(false)
        }
      };

        useEffect(() => {
          const token = localStorage.getItem("token");

          if (token) {
            navigate("/");
          }
        }, []);

  return (
    <div className="h-[calc(100vh-var(--header-height))]  flex items-center justify-center w-full ">
      <form onSubmit={handleSubmit} className="w-100 p-4 shadow rounded-2xl ">
        <h1 className="text-2xl  text-center mb-2 font-semibold">
          Create Account
        </h1>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">
            Name
          </label>

          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
            placeholder="Enter your name"
            className="w-full p-2 border rounded-xl "
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
            placeholder="Enter your email"
            className="w-full p-2 border rounded-xl"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleInputChange}
            value={formData.password}
            placeholder="Enter your password"
            className="w-full p-2 border rounded-xl"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block mb-1">
            Confirm Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            name="confirm_password"
            onChange={handleInputChange}
            value={formData.confirm_password}
            placeholder="Confirm your password"
            className="w-full p-2 border rounded-xl"
          />
          {/* <span>
              {showPassword ? <Eye onClick={()=>setShowPassword(false)}/> : <EyeClosed onClick={()=>setShowPassword(true)}/>}
            </span> */}
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600"
          disabled={loading}
          style={{
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.5 : 1,
          }}
        >
          {loading ? "loading..." : "Sign Up"}
        </button>
        <h1 className="text-center ">
          already have an account?
          <Link to="/signIn" className="text-blue-600 text-sm font-medium">
            SignUp
          </Link>
        </h1>
      </form>
    </div>
  );
};

export default Signup;
