const Footer =()=>{
    return(
        <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 mt-12">
                    <div className="container mx-auto py-6 px-4 text-center text-gray-500 dark:text-gray-400">
                        <p className="mb-2">&copy; {new Date().getFullYear()} iNFAMY Esports. Casi todos los Derechos Reservados.</p>
                        <a href="https://clashk.ing/" target="_blank" className="text-sm ">Powered by ClashKing</a>
                    </div>
        </footer>
    )
}

export default Footer;