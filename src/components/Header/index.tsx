"use client";
import { toogleDarkMode } from "@/redux/slice/global";
import { FaMoon, FaSun } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

interface IProps {
  toogleSidebar?: () => void;
}

const Header = ({ toogleSidebar }: IProps) => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: any) => state.global);

  const handleThema = () => {
    dispatch(toogleDarkMode({ darkMode }));
  };
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              onClick={toogleSidebar}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              <HiOutlineMenuAlt2 className="text-2xl" />
            </button>
            <a href="#" className="flex ms-2 md:me-24">
              <GiBookshelf className="h-8 me-3 text-xl text-blue-500" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                BookShelf
              </span>
            </a>
          </div>
          <button
            className="dark:bg-slate-50 dark:text-slate-700 rounded-full p-2"
            onClick={handleThema}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
