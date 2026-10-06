import { CloudCog } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({email: "", password: "" });
  const [loading,setLoading]=useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eleName = e.target.name;
    const eleValue = e.target.value;
    setFormData({ ...formData, [eleName]: eleValue });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true)
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      
      if (!data.success) {
        console.error("Error adding todo:", data.message);
        return;
      }
      localStorage.setItem("token",data.access_token)
      // window.location.href = "/";
      navigate("/");
    } catch (error) {
      console.error("Error signin todo:", error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(()=>{
    const token=localStorage.getItem("token")
    if (token){
      navigate("/")
    }
  },[])

  return (
    <div className="h-[calc(100vh-var(--header-height))] flex items-center justify-center  w-full ">
      <form onSubmit={handleSubmit} className="w-100 p-4 shadow rounded-2xl ">
        <h1 className="text-2xl text-center mb-6 font-semibold">
          Create Account
        </h1>

        <div className="mb-4">
          <label htmlFor="email" className="">
            Email
          </label>

          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-xl"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="">
            Password
          </label>

          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-xl"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600"
          disabled={loading}
          style={{cursor:loading ? "not-allowed" : "pointer" , opacity: loading ? 0.5: 1}}
        >
          {loading ? "loading..." : "Sign In"}
        </button>
        <h1 className="text-center mt-5">
          Don`t have an account?
          <Link to="/signUp" className="text-blue-600 text-sm font-medium">
            signUp
          </Link>
        </h1>
      </form>
    </div>
  );
};

export default SignIn;
