import { useEffect, useState } from "react";
import NavLink from "./NavLink";
import { Menu, Moon, Shield, Sun, Twitch, Twitter, X, Youtube } from "lucide-react";
import { useNavigate } from "react-router";

const Navbar = ({ clanInfo }) => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigation = useNavigate()
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);


    }, [theme]);
    
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }
    return (
        <header className="bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <a onClick={(e) => { navigation('/') }} className="flex items-center gap-3">
                        {clanInfo ? <img src="https://api-assets.clashofclans.com/badges/200/H0rCkaw8vBreNBMIozcJWi-iAmLuIF0pkEnV_76jmn0.png" alt="Escudo del Clan" className="h-10 w-10" /> : <Shield className="h-8 w-8 text-gray-800 dark:text-gray-200" />}
                        <span className="text-xl cursor-pointer font-bold text-gray-900 dark:text-white tracking-wider">iNFAMY</span>
                    </a>
                    <div className="flex items-center gap-4">
                        <nav className="hidden lg:flex items-center">
                            <NavLink to="/">Inicio</NavLink>
                            <NavLink to="/team">Equipo</NavLink>
                            <NavLink to="/schedule">Calendario</NavLink>
                            <NavLink to="/hall-of-fame">Salón de la Fama</NavLink>
                            <NavLink to="/join">Únete</NavLink>
                        </nav>

                        <button onClick={toggleTheme} className="hidden lg:flex p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800">
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <div className="lg:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none">
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="lg:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink closeMenu={setIsMenuOpen} isMobile={true} to="/">Inicio</NavLink>
                        <NavLink closeMenu={setIsMenuOpen} isMobile={true} to="/team">Equipo</NavLink>
                        <NavLink closeMenu={setIsMenuOpen} isMobile={true} to="/schedule">Calendario</NavLink>
                        <NavLink closeMenu={setIsMenuOpen} isMobile={true} to="/hall-of-fame">Salón de la Fama</NavLink>
                        <NavLink closeMenu={setIsMenuOpen} isMobile={true} to="/join">Únete</NavLink>
                    </div>
                    <div className="flex items-center justify-between py-4 px-4 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white"><Twitter /></a>
                            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white"><Youtube /></a>
                            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white"><Twitch /></a>
                        </div>
                        <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800">
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                    </div>
                </div>
            )}
        </header>
    )
}
export default Navbar;