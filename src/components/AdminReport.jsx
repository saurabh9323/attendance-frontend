import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

function AdminReport() {
  const [users, setUsers] = useState([]);
  const [currentPageUsers, setCurrentPageUsers] = useState(0); // State for current page of users table
  const pageSizeUsers = 5; // Number of elements per page for users table
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/report",
          {
            withCredentials: true,
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isSignedIn");

    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    navigate("/");
  };

  const handleViewAttendance = async (username) => {
    navigate(`/attendance-record/${username}`);
  };

  const totalPagesUsers = Math.ceil(users.length / pageSizeUsers);

  const goToPreviousPageUsers = () => {
    setCurrentPageUsers((prevPage) => Math.max(prevPage - 1, 0));
  };

  const goToNextPageUsers = () => {
    setCurrentPageUsers((prevPage) =>
      Math.min(prevPage + 1, totalPagesUsers - 1)
    );
  };

  return (
    <div className="flex flex-col pt-10 justify-between items-center h-[500px]  bg-slate-100">
      <div className="shadow-lg min-w-[400px] w-full min-h-[200px] h-full rounded-lg items-center text-center hover:outline outline-offset-2 outline-gray-100 m-2 bg-slate-200">
        <table className="min-w-[500px] w-full min-h-[200px] h-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Username</th>
              <th className="border border-gray-400 px-4 py-2">Email</th>
              <th className="border border-gray-400 px-4 py-2">Phone</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .slice(
                currentPageUsers * pageSizeUsers,
                (currentPageUsers + 1) * pageSizeUsers
              )
              .map((user, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2">
                    {user.username}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {user.phone}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <button
                      className="ml-4 pl-4 bg-slate-300 hover:bg-slate-200 text-black font-bold py-2 px-4 rounded-lg"
                      onClick={() => handleViewAttendance(user.username)}
                    >
                      View Attendance
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex items-center justify-center">
        <button
          onClick={goToPreviousPageUsers}
          disabled={currentPageUsers === 0}
          className="mr-2 hover:bg-gray-300 text-black font-bold py-2 px-2 rounded-full"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        {Array.from({ length: totalPagesUsers }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPageUsers(index)}
            className={`mr-2 hover:bg-gray-300 text-black font-bold py-2 px-3 rounded-full ${
              currentPageUsers === index ? "bg-gray-300" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={goToNextPageUsers}
          disabled={
            currentPageUsers === totalPagesUsers - 1 || totalPagesUsers === 0
          }
          className="mr-2 hover:bg-gray-300 text-black font-bold py-2 px-2 rounded-full"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>

      <button
        className="bg-backColor border-2 w-[120px] h-[30px] absolute right-2 top-5 rounded-lg hover:bg-customBlue"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminReport;
