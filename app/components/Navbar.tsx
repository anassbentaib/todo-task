"use client";
import { useRouter } from "next/navigation";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md -lg">
      <h1
        onClick={() => router.push("/")}
        className="text-xl font-bold cursor-pointer text-gray-800 dark:text-white"
      >
        Todo List
      </h1>
      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          className="mr-4 px-2 py-1 flex items-center bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          <span className="mr- text-2xl">{isDarkMode ? "🌙" : "☀️"}</span>
        </button>

        <button
          onClick={() => router.push("/create-task")}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-500 transition"
        >
          Create Task
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
