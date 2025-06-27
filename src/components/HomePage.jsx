import { useNavigate } from "react-router";

const sponsors = [
    { name: 'Nike', logo: '/sponsors/nike.svg' },
    { name: 'Yamaha', logo: '/sponsors/yamaha.svg' },
    { name: 'Corsair', logo: '/sponsors/corsair.svg' },
    { name: 'Intel', logo: '/sponsors/intel.svg' },
    { name: 'Logitech', logo: '/sponsors/logitech.svg' },
];

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="animate-fade-in">
            <div className="relative text-center my-8 h-[60vh] md:h-[70vh] flex flex-col items-center justify-center overflow-hidden">
                <img src="https://images.alphacoders.com/782/782653.png" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="relative z-10 p-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter animate-fade-in-down" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
                        iNFAMY
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s', textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
                        Nos acercamos lentamentente hacia la cima.
                    </p>
                    <button onClick={() => navigate('/team')} className="mt-10 cursor-pointer inline-block bg-white text-black font-bold py-4 px-12 uppercase tracking-widest hover:bg-gray-200 transition-all transform hover:scale-105 shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                        Conoce al Equipo
                    </button>
                </div>
            </div>
            <div className="mt-20 ">
                <h2 className="text-center text-2xl font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase mb-12">Nuestros Patrocinadores</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
                    {sponsors.map(sponsor => (
                        <div key={sponsor.name} className="flex justify-center items-center transform hover:scale-110 transition-transform grayscale  opacity-60 hover:opacity-100">
                            <img src={sponsor.logo} alt={sponsor.name} className="max-w-40 h-auto dark:invert" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

};

export default HomePage;