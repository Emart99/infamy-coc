import { NavLink as RouterNavLink } from 'react-router';

const NavLink = ({ to, children, isMobile, closeMenu }) => {
    
    const baseClasses = "flex items-center px-4 py-2 text-sm font-medium transition-colors";
    const activeClasses = "text-black dark:text-white";
    const inactiveClasses = "text-gray-500 dark:text-gray-300";

    const handleClick = () => {
        if (isMobile && closeMenu) {
            closeMenu(false)
        }
    };

    return (
        <RouterNavLink 
            to={to} 
            onClick={handleClick} 
            className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
            <span>{children}</span>
        </RouterNavLink>
    );
};

export default NavLink;