import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../redux/user/userSlice";

function Register() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [cnfPass, setCnfPass] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      const actionResult = await dispatch(register({ ...formData }));
      unwrapResult(actionResult);
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const cnfPassword = () => {
    if (formData.password !== formData.cnfPassword) {
      setCnfPass(false);
    } else {
      setCnfPass(true);
    }
  };

  return (
    <div>
      {/* {userToken && <Navigate to="/" />} */}
      <section>
        <div className="flex justify-center items-center h-full  mt-7 w-full ">
          <div>
            <div className="border-black">
              <div className="flex items-center justify-center font-bold">
                Register
              </div>
              {/* Username input */}
              <div className="mb-6">
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="emailInput"
                  placeholder="username"
                />
              </div>
              {/* Email input */}
              <div className="mb-6">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="emailInput"
                  placeholder="email"
                />
              </div>
              {/* Password input */}
              <div className="mb-6">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="passInput"
                  placeholder="Password"
                />
              </div>
              {/* conferm password input */}
              <div className="mb-6">
                <input
                  type="cnfPassword"
                  name="cnfpassword"
                  onChange={handleChange}
                  className={`form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 ${
                    cnfPass
                      ? "focus:text-green-700 focus:bg-white focus:border-green-600"
                      : "focus:text-red-500 focus:border-red-600"
                  } focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                  id="passInput"
                  placeholder="Confirm Password"
                />
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Register
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Already have an account? Log in
                  <Link
                    to={"/login"}
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out ml-5"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
