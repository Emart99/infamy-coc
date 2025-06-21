const NavLink = ({ page, setPage, currentPage, children, isMobile, closeMenu }) => {
    const isActive = page === currentPage;
    const baseClasses = "flex items-center px-4 py-2 text-sm font-medium transition-colors";
    const activeClasses = "text-black dark:text-white";
    const inactiveClasses = "text-gray-500 dark:text-gray-300";
    const handleClick = (e) => {
        e.preventDefault();
        setPage(page);
        if (isMobile && closeMenu) {
            closeMenu();
        }
    };
    return (
        <a href={`#${page}`} onClick={handleClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            <span>{children}</span>
        </a>
    );
};

export default NavLink;