import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-Start items-center border-b sticky h-[60px] bg-customBlue">
      <h1 className="font-extrabold text-2xl ml-6">
        <Link to={"/"}>Attendance</Link>
      </h1>
    </div>
  );
};

export default Navbar;
