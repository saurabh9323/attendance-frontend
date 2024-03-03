/* eslint-disable no-unused-vars */
// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// function Register() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [message, setMessage] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const navigate = useNavigate();

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//     setMessage("");
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     setMessage("");
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     setMessage("");
//   };

//   const handlePhoneChange = (e) => {
//     const sanitizedValue = e.target.value.replace(/\D/g, "");
//     setPhone(sanitizedValue);
//     setMessage("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitted(true);

//     try {
//       const response = await axios.post("http://localhost:5000/api/signup", {
//         username,
//         password,
//         email,
//         phone,
//       });
//       setMessage(response.data.message);
//       setUsername("");
//       setPassword("");
//       setEmail("");
//       setPhone("");
//       navigate("/login");
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         setMessage("Username or email already exists");
//       } else {
//         console.error("Registration failed:", error);
//         setMessage("Registration failed");
//       }
//     }
//   };

//   return (
//     <div className="min-h-[500px] bg-gray-100 flex flex-col justify-center sm:px-6 py-2 lg:px-8">
//       <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-2 px-4 shadow sm:rounded-lg sm:px-10 mb-2">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div className="sm:mx-auto sm:w-full sm:max-w-md">
//               <h2 className="mt-[-8px] pt-2 text-center text-3xl font-extrabold text-gray-900">
//                 Register
//               </h2>
//               {message && (
//                 <p className="mt-2 text-center text-xl text-red-600">
//                   {message}
//                 </p>
//               )}
//             </div>
//             <div>
//               <label
//                 htmlFor="username"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Username
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="username"
//                   name="username"
//                   type="text"
//                   autoComplete="username"
//                   value={username}
//                   onChange={handleUsernameChange}
//                   className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
//                     username
//                       ? "border-green-500"
//                       : submitted && !username
//                       ? "border-red-500"
//                       : "border-gray-300"
//                   }`}
//                 />
//                 {!username && submitted && (
//                   <p className="mt-1 text-sm text-red-600">
//                     Username field is empty
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="new-password"
//                   value={password}
//                   onChange={handlePasswordChange}
//                   className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
//                     password
//                       ? "border-green-500"
//                       : submitted && !password
//                       ? "border-red-500"
//                       : "border-gray-300"
//                   }`}
//                 />
//                 {!password && submitted && (
//                   <p className="mt-1 text-sm text-red-600">
//                     Password field is empty
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   value={email}
//                   onChange={handleEmailChange}
//                   className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
//                     email
//                       ? "border-green-500"
//                       : submitted && !email
//                       ? "border-red-500"
//                       : "border-gray-300"
//                   }`}
//                 />
//                 {!email && submitted && (
//                   <p className="mt-1 text-sm text-red-600">
//                     Email field is empty
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="phone"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Phone number
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="phone"
//                   name="phone"
//                   type="tel"
//                   autoComplete="tel"
//                   value={phone}
//                   maxLength={10}
//                   minLength={10}
//                   onChange={handlePhoneChange}
//                   className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
//                     phone
//                       ? "border-green-500"
//                       : submitted && !phone
//                       ? "border-red-500"
//                       : "border-gray-300"
//                   }`}
//                 />
//                 {!phone && submitted && (
//                   <p className="mt-1 text-sm text-red-600">
//                     Phone field is empty
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Register
//               </button>
//             </div>
//             <div className="mt-6 text-center">
//               <p className="text-base text-gray-600">
//                 Already have an account?{" "}
//                 <Link
//                   to="/login"
//                   className="font-medium text-indigo-600 hover:text-indigo-500"
//                 >
//                   Login
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (showSuccessMessage) {
      timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000); // Set the duration for how long the success message will be displayed
    }
    return () => clearTimeout(timer);
  }, [showSuccessMessage]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setMessage("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setMessage("");
  };

  const handlePhoneChange = (e) => {
    const sanitizedValue = e.target.value.replace(/\D/g, "");
    setPhone(sanitizedValue);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        username,
        password,
        email,
        phone,
      });
      setMessage("You have successfully registered.");
      setShowSuccessMessage(true);
      setUsername("");
      setPassword("");
      setEmail("");
      setPhone("");
      setTimeout(() => {
        setMessage("");
        navigate("/login");
      }, 1000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage("Username or email already exists");
      } else {
        console.error("Registration failed:", error);
        setMessage("Registration failed");
      }
    }
  };

  return (
    <div className="min-h-[500px] bg-gray-100 flex flex-col justify-center sm:px-6 py-2 lg:px-8">
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-2 px-4 shadow sm:rounded-lg sm:px-10 mb-2">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-[-8px] pt-2 text-center text-3xl font-extrabold text-gray-900">
                Register
              </h2>
              {message && (
                <p
                  className={`mt-2 text-center text-xl ${
                    message.includes("successfully")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={handleUsernameChange}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    username
                      ? "border-green-500"
                      : submitted && !username
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {!username && submitted && (
                  <p className="mt-1 text-sm text-red-600">
                    Username field is empty
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    password
                      ? "border-green-500"
                      : submitted && !password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {!password && submitted && (
                  <p className="mt-1 text-sm text-red-600">
                    Password field is empty
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    email
                      ? "border-green-500"
                      : submitted && !email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {!email && submitted && (
                  <p className="mt-1 text-sm text-red-600">
                    Email field is empty
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  maxLength={10}
                  minLength={10}
                  onChange={handlePhoneChange}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    phone
                      ? "border-green-500"
                      : submitted && !phone
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {!phone && submitted && (
                  <p className="mt-1 text-sm text-red-600">
                    Phone field is empty
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-base text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
