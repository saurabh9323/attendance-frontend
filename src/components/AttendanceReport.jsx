/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"; // Import icons for pagination

function AttendanceReport() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/attendance/report`,
            { withCredentials: true }
          );

          if (
            Array.isArray(response.data.attendance) &&
            Array.isArray(response.data.absentDays)
          ) {
            const combinedData = [
              ...response.data.attendance,
              ...response.data.absentDays,
            ];

            const sortedData = combinedData
              .filter((item) => typeof item === "object")
              .sort((a, b) => {
                const dateA = DateTime.fromFormat(
                  a.date,
                  "MM/dd/yyyy"
                ).toMillis();
                const dateB = DateTime.fromFormat(
                  b.date,
                  "MM/dd/yyyy"
                ).toMillis();
                return dateA - dateB;
              });

            setAttendanceData(sortedData);
            setTotalPages(Math.ceil(sortedData.length / pageSize));
          } else {
            console.error("Invalid data format:", response.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [pageSize]);

  const getStatus = (loggedHours) => {
    if (!loggedHours || loggedHours === "0.00") return "Absent"; // Default status if loggedHours is undefined or 0

    const totalHours = parseFloat(loggedHours);

    if (totalHours >= 4) {
      return "Full Day";
    } else if (totalHours >= 1) {
      return "Half Day";
    } else {
      return "Absent";
    }
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("isSignedIn");

    // Clear authToken cookie
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to home page
    navigate("/");
  };

  return (
    <div className="flex h-[500px] flex-col gap-10 items-center justify-center bg-slate-100">
      <h2>Attendance Report</h2>
      <table className="border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Date</th>
            <th className="border border-gray-400 px-4 py-2">Sign in</th>
            <th className="border border-gray-400 px-4 py-2">Sign out</th>
            <th className="border border-gray-400 px-4 py-2">Logged Hours</th>
            <th className="border border-gray-400 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData
            .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
            .map((record, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">
                  {record.date}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {record.signInTime
                    ? DateTime.fromFormat(
                        record.signInTime,
                        "MM/dd/yyyy h:mm a"
                      ).toFormat("h:mm a")
                    : "Absent"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {record.signOutTime
                    ? DateTime.fromFormat(
                        record.signOutTime,
                        "MM/dd/yyyy h:mm a"
                      ).toFormat("h:mm a")
                    : "Absent"}
                </td>

                <td className="border border-gray-400 px-4 py-2">
                  {record.loggedHours}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {getStatus(record.loggedHours)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
          className="mr-2 hover:bg-gray-300 text-black font-bold py-2 px-2 rounded-full"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`mr-2 hover:bg-gray-300 text-black font-bold py-2 px-3 rounded-full ${
              currentPage === index ? "bg-gray-300" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1 || totalPages === 0}
          className="mr-2 hover:bg-gray-300 text-black font-bold py-2 px-2 rounded-full"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="flex gap-4 mb-3">
        <button
          className="bg-red-500 border-2 w-[120px] h-[30px] rounded-2xl absolute right-2 top-5"
          onClick={handleLogout}
        >
          Logout
        </button>
        <button className="bg-blue-400 border-2 w-[120px] h-[30px] rounded-2xl absolute right-36 top-5">
          <Link to={"/home"}> Home</Link>
        </button>
      </div>
    </div>
  );
}

export default AttendanceReport;
