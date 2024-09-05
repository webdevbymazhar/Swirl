import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import countries from "../../utils/countries";

const Signup = () => {
  let navigate = useNavigate();
  let [showPassword, setShowPassword] = useState(false);
  let [data, setdata] = useState({
    fname:"",
    lname:"",
    email: "",
    username: "",
    password: "",
    image:'',
    country:"",
    confirmpass:""
  });

  let [loading,setLoading] = useState(false)

  let handleData = (e) => {
    if (e.target.name === 'image') {
      setdata({ ...data, image: e.target.files[0] });
    } else {
      setdata({ ...data, [e.target.name]: e.target.value });
    }
    
  };
  let submitData = async () => {
    setLoading(true)
    try {
      let res = await axios.post("http://localhost:8000/user/signup", data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (res) {
        toast.success("User Registered Successfully, Please Log In");
        navigate("/login");
      }
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred';
      toast.error(message);
    } finally {
      setLoading(false);
    }

    
  
  };

  return (
    <div className="flex justify-center items-center  sm:mt-[8vh] w-full ">
      <div className="bg-white  sm:w-[600px] flex flex-col gap-6 p-4">
        <img
          className="w-[50px] h-auto m-auto block"
          src="logo.png"
          alt="logo"
        />
        <h1 className="text-center text-xl font-bold mb-2">
        Design Your Profile, Define Your Path!
        </h1>
        <div className="grid sm:grid-cols-12 gap-4">
         <div className="col-span-6">
         <label className="font-semibold" htmlFor="">
            First Name :
          </label>
          <input
            required
            autoComplete="off"
            onChange={(e) => handleData(e)}
            name="fname"
            className="border-gray border-2 rounded-md w-[100%] mt-2 px-1 py-2 sm:py-1"
            type="test"
            placeholder="Enter first name"
          />
         </div>
         <div className="col-span-6">
          <label className="font-semibold" htmlFor="">
            Last Name :
          </label>
          <input
            autoComplete="off"
            onChange={(e) => handleData(e)}
            name="lname"
            className="border-gray border-2 rounded-md w-[100%] mt-2 px-1 py-2 sm:py-1"
            type="text"
            placeholder="Enter last name"
          />
        </div>
        </div>

        <div className="grid sm:grid-cols-12 gap-4">
         
         <div className="col-span-6">
          <label className="font-semibold" htmlFor="">
            Username :
          </label>
          <input
            autoComplete="off"
            onChange={(e) => handleData(e)}
            name="username"
            className="border-gray border-2 rounded-md w-[100%] mt-2 px-1 py-2 sm:py-1"
            type="text"
            placeholder="Enter username"
          />
        </div>
        <div className="col-span-6">
         <label className="font-semibold">Email Address : </label>
         <input
            autoComplete="off"
            onChange={(e) => handleData(e)}
            name="email"
            className="border-gray border-2 rounded-md w-[100%] mt-2 px-1 py-2 sm:py-1"
            type="email"
            placeholder="Enter username"
          />
         </div>
        
        </div>
        <div className="grid sm:grid-cols-12 gap-4">

        <div className="col-span-6">
         <label className="font-semibold">Profile Picture :</label>
         <input class="border-gray border-2 rounded-md w-[100%] mt-2 px-2 sm:py-1 " type="file" name="image" onChange={(e) => handleData(e)} placeholder="choose profile pic"/>
         </div>
         
         <div className="col-span-6">
          <label className="font-semibold" htmlFor="">
            Country :
          </label>
          <select onChange={(e) => handleData(e)}  className="border-gray border-2 rounded-md w-[100%] mt-2 px-1 py-2 sm:py-1" name="country"  id="">
           {
            countries.map((v,i)=>{
              return <option  key={i} value={v}>{v}</option>
            })
           }
          </select>
        </div>
       
        </div>
        <div className="grid sm:grid-cols-12 gap-4">
        <div className="col-span-6" style={{ position: "relative" }}>
          <label className="font-semibold" htmlFor="">
            Password :
          </label>
          <input
            required
            autoComplete="off"
            onChange={(e) => handleData(e)}
            name="password"
            className="border-2 rounded-md w-[100%] mt-2 px-1 py-2 sm:py-1"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
          />
          <span
            onMouseUp={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", left: "91%", top: "42px",cursor:"pointer" }}
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        </div>

              <div className="col-span-6" style={{ position: "relative" }}>
          <label className="font-semibold" htmlFor="">
            Confirm Password :
          </label>
          <input
            required
            autoComplete="off"
            onChange={(e) => handleData(e)}
            name="confirmpass"
            className="border-2 rounded-md w-[100%] mt-2 px-1 py-2 sm:py-1"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
          />
          <span
            onMouseUp={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", left: "91%", top: "42px",cursor:"pointer" }}
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        </div>  
        </div>
        
        <button
          onClick={submitData}
          className="mt-4 w-[100%] p-2 text-white font-bold rounded-md bg-[#00BFFE] hover:bg-[#8ddcf6]"
        >
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-black"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </button>
        <p className="text-center ">
          Already a user ?{" "}
          <Link to={"/login"} className="text-[#00BFFE]" href="">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
