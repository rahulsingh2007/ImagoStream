import { Bookmark, Sun, Moon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/favicon.svg";
import { useTheme } from "../context/useTheme";

const Navbar = () => {
    const navigate = useNavigate();
    const { isDark, toggleTheme } = useTheme();

    const handleLogoClick = () => {
        navigate('/');
        window.location.reload();
    };

    const linkStyle = ({ isActive }) =>
        `text-sm sm:text-base font-semibold px-2.5 sm:px-4 pt-1 pb-4 sm:pb-5 border-b-2 transition-all duration-500 flex items-center gap-1 active:scale-95 transform translate-y-[1px] ${
            isActive
                ? 'text-blue-700 dark:text-blue-400 border-blue-700 dark:border-blue-400'
                : 'text-gray-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-slate-200 border-transparent'
        }`;

    return (
        <div className="flex justify-between items-center pt-4 sm:pt-5 pb-0 px-4 sm:px-8 md:px-10 bg-white dark:bg-[#0B0F19] text-black dark:text-slate-100 border-b border-gray-100 dark:border-slate-800 transition-colors duration-100">
            <div onClick={handleLogoClick} className="flex items-center cursor-pointer gap-2 pb-4 sm:pb-5">
                <img src={Logo} alt="LensLoom Logo" className="w-7 h-7 sm:w-8 sm:h-8" />
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">ImagoStream</h2>
            </div>

            <div className="flex gap-1.5 sm:gap-2 items-center">
                <NavLink className={linkStyle} to="/">
                    Search
                </NavLink>
                <NavLink className={linkStyle} to="/collection">
                    <Bookmark size={16} strokeWidth={2} />
                    Collection
                </NavLink>
                <button
                    onClick={toggleTheme}
                    type="button"
                    className="theme-toggle-btn ml-1 sm:ml-2 mb-4 sm:mb-5 p-1.5 sm:p-2 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95"
                    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                    title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {isDark ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-slate-600" />}
                </button>
            </div>
        </div>
    );
};

export default Navbar;
