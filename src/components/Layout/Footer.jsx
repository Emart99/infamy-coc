const Footer =()=>{
    return(
        <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 mt-12">
                    <div className="container mx-auto py-6 px-4 text-center text-gray-500 dark:text-gray-400">
                        <p>&copy; {new Date().getFullYear()} iNFAMY Esports. Todos los Derechos Reservados.</p>
                        <p className="text-sm mt-2">Este es un sitio web conceptual y no está afiliado a Supercell o sus socios.</p>
                    </div>
        </footer>
    )
}

export default Footer;