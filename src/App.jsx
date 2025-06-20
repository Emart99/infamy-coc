import  { useState, useEffect } from 'react';
import { Shield, Twitter, Youtube, Twitch, Menu, X, LoaderCircle, AlertTriangle, ArrowLeft, Star, Sun, Moon, CheckCircle, Clipboard } from 'lucide-react';

const sponsors = [
    { name: 'Natura', logo: 'https://placehold.co/200x100/e2e8f0/4a5568?text=Natura' },
    { name: 'Yamaha', logo: 'https://placehold.co/200x100/e2e8f0/4a5568?text=Yamaha' },
    { name: 'Corsair', logo: 'https://placehold.co/200x100/e2e8f0/4a5568?text=Corsair' },
    { name: 'Intel', logo: 'https://placehold.co/200x100/e2e8f0/4a5568?text=Intel' },
    { name: 'Logitech', logo: 'https://placehold.co/200x100/e2e8f0/4a5568?text=Logitech' },
];

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

const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-24">
        <LoaderCircle className="w-12 h-12 text-gray-800 dark:text-gray-200 animate-spin" />
    </div>
);

const ErrorMessage = ({ message }) => (
    <div className="flex flex-col items-center justify-center text-center bg-red-100 border border-red-200 p-6 my-8 dark:bg-red-900/20 dark:border-red-500/30">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-red-700 dark:text-red-400">Ocurrió un Error al Cargar los Datos</h3>
        <p className="text-red-600 dark:text-red-300 mt-2">{message}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
           Asegúrate de que la Netlify Function esté desplegada y funcionando correctamente.
        </p>
    </div>
);

const HomePage = ({ setPage }) => (
    <div className="animate-fade-in">
        <div className="relative bg-gray-200 dark:bg-gray-800 overflow-hidden my-8 border border-gray-200 dark:border-gray-700">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <img src="https://placehold.co/1200x600/e5e7eb/4b5568?text=iNFAMY" alt="Banner del Equipo" className="w-full h-auto object-cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <Shield className="h-16 w-16 text-red-500 drop-shadow-lg animate-pulse" />
                <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight uppercase" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                    iNFAMY
                </h1>
                <p className="mt-4 text-lg md:text-xl text-white max-w-2xl" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                    Aniquilando aldeas y forjando leyendas. Somos la élite. Somos iNFAMY.
                </p>
                <button onClick={() => setPage('team')} className="mt-8 inline-block bg-black text-white font-bold py-3 px-8 hover:bg-gray-800 transition-transform transform hover:scale-105 shadow-lg">
                    Conoce al Equipo
                </button>
            </div>
        </div>
         <div className="py-16">
            <h2 className="text-center text-2xl font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase mb-12">Nuestros Patrocinadores</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center">
                {sponsors.map(sponsor => (
                    <div key={sponsor.name} className="flex justify-center items-center transform hover:scale-110 transition-transform">
                        <img src={sponsor.logo} alt={sponsor.name} className="max-w-full h-auto" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const TeamPage = ({ clanInfo, onPlayerClick }) => {
    const roleOrder = { leader: 1, coLeader: 2, admin: 3, member: 4 };
    const sortedMembers = [...(clanInfo?.memberList || [])].sort((a, b) => (roleOrder[a.role] || 5) - (roleOrder[b.role] || 5));
    
    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Nuestro Equipo</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Los arquitectos de la victoria. Haz clic en un jugador para ver sus detalles.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {sortedMembers.map(member => (
                    <div key={member.tag} onClick={() => onPlayerClick(member)} className="bg-white dark:bg-gray-950 p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:bg-gray-800 transition-all cursor-pointer">
                        <img src={member.league.iconUrls.medium} alt={member.league.name} className="w-32 h-32 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{member.name}</h2>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">{({ leader: 'Líder', coLeader: 'Co-líder', admin: 'Veterano', member: 'Miembro' })[member.role] || member.role}</p>
                        <div className="flex justify-center gap-6 text-gray-700 dark:text-gray-300">
                            <span>AYTO: {member.townHallLevel}</span>
                            <span>Trofeos: {member.trophies}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SchedulePage = ({ warLog, onWarClick }) => (
     <div className="animate-fade-in">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Registro de Guerra</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Resultados de nuestras batallas más recientes. Haz clic en una guerra para ver más detalles.</p>
        <div className="bg-white dark:bg-gray-950 overflow-hidden border border-gray-200 dark:border-gray-700">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {warLog.slice(0, 15).map((war, index) => {
                    const resultStyle = (r => (!r ? { text: 'En curso', color: 'yellow' } : { win: { text: 'Victoria', color: 'green' }, lose: { text: 'Derrota', color: 'red' }, tie: { text: 'Empate', color: 'gray' } }[r] || { text: r, color: 'gray' }))(war.result);
                    const resultColorClasses = { green: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300', red: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300', yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300', gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' };
                    return (
                        <li key={index} onClick={() => onWarClick(war)} className="p-4 md:p-6 grid grid-cols-2 md:grid-cols-3 items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
                            <div className="flex items-center gap-4">
                                <img src={war.opponent.badgeUrls.small} alt="escudo oponente" className="w-10 h-10"/>
                                <div>
                                    <span className="font-bold text-gray-900 dark:text-white text-lg">{war.opponent.name}</span>
                                    <span className="block text-gray-500 dark:text-gray-400 text-sm">Fin: {(iso => iso ? new Date(`${iso.substring(0,4)}-${iso.substring(4,6)}-${iso.substring(6,8)}`).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : '')(war.endTime)}</span>
                                </div>
                            </div>
                            <div className="text-right md:text-center">
                                <span className={`px-4 py-1 rounded-full text-sm font-bold ${resultColorClasses[resultStyle.color]}`}>{resultStyle.text}</span>
                            </div>
                            <div className="col-span-2 md:col-span-1 text-right text-lg font-bold text-gray-900 dark:text-white">
                                <span>{war.clan.stars} <span className="text-yellow-500">★</span></span>
                                <span className="mx-2 text-gray-400">-</span>
                                <span>{war.opponent.stars} <span className="text-yellow-500">★</span></span>
                            </div>
                        </li>
                    )}
                )}
            </ul>
        </div>
    </div>
);

const WarDetailPage = ({ war, onBack }) => {
    if (!war) return null;
    
    return (
        <div className="animate-fade-in">
            <button onClick={onBack} className="inline-flex items-center gap-2 bg-black text-white font-bold py-2 px-4 mb-8 hover:bg-gray-800 transition-colors">
                <ArrowLeft size={16} />
                Volver al Calendario
            </button>
            <div className="bg-white dark:bg-gray-950 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center items-center">
                    <div className="flex items-center gap-4 justify-start">
                        <img src={war.clan.badgeUrls.medium} alt={war.clan.name} className="w-16 h-16"/>
                        <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{war.clan.name}</span>
                    </div>
                    <span className="text-2xl font-bold my-4 md:my-0 self-center dark:text-gray-400">VS</span>
                    <div className="flex items-center gap-4 flex-row-reverse md:justify-end">
                        <img src={war.opponent.badgeUrls.medium} alt={war.opponent.name} className="w-16 h-16"/>
                        <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{war.opponent.name}</span>
                    </div>
                </div>
                 <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4">
                        <div className="text-4xl font-bold text-yellow-500 flex items-center justify-center gap-2">{war.clan.stars} <Star /></div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">Estrellas (Nuestro Clan)</div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4">
                        <div className={`text-4xl font-bold ${war.result === 'win' ? 'text-green-600' : war.result === 'lose' ? 'text-red-600' : 'text-gray-500'}`}>{({win: 'VICTORIA', lose: 'DERROTA', tie: 'EMPATE'})[war.result] || 'EN CURSO'}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">Resultado Final</div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4">
                        <div className="text-4xl font-bold text-yellow-500 flex items-center justify-center gap-2">{war.opponent.stars} <Star /></div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">Estrellas (Oponente)</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const JoinUsPage = ({clanTag}) => {
    const [copyText, setCopyText] = useState('Copiar');

    const handleCopy = () => {
        if (!clanTag) return;
        const decodedTag = clanTag.replace('%23', '#');
        const textArea = document.createElement('textarea');
        textArea.value = decodedTag;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        setCopyText('¡Copiado!');
        setTimeout(() => setCopyText('Copiar'), 2000);
    };

    return (
        <div className="animate-fade-in">
            <div>
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Centro de Reclutamiento</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-12">¿Listo para unirte a la élite? Sigue estos pasos para aplicar.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-950 p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Paso 1: Copia Nuestro Tag de Clan</h2>
                <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4">
                    <span className="font-mono text-lg text-blue-600 dark:text-blue-400">{clanTag ? clanTag.replace('%23', '#') : 'Cargando...'}</span>
                    <button onClick={handleCopy} className="bg-black text-white font-semibold py-2 px-4 hover:bg-gray-800 transition-colors flex items-center gap-2">
                        <Clipboard size={16} />
                        {copyText}
                    </button>
                </div>
            </div>

            <div className="mt-8 bg-white dark:bg-gray-950 p-8 border border-gray-200 dark:border-gray-700">
                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Paso 2: Cumple los Requisitos</h2>
                 <ul className="space-y-4">
                     <li className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20}/>
                        <span className="text-gray-700 dark:text-gray-300">Ayuntamiento Nivel 15+</span>
                     </li>
                     <li className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20}/>
                        <span className="text-gray-700 dark:text-gray-300">Héroes Nivel 80+</span>
                     </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20}/>
                        <span className="text-gray-700 dark:text-gray-300">Actividad en Guerras y Ligas de Guerra</span>
                     </li>
                     <li className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20}/>
                        <span className="text-gray-700 dark:text-gray-300">Uso obligatorio de Discord</span>
                     </li>
                 </ul>
            </div>
            
             <div className="mt-8 bg-white dark:bg-gray-950 p-8 border border-gray-200 dark:border-gray-700">
                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Paso 3: ¡Envía tu Solicitud!</h2>
                 <p className="text-gray-600 dark:text-gray-400 mb-6">Busca nuestro tag en Clash of Clans y envía tu solicitud. ¡Te esperamos en el campo de batalla!</p>
                 <a href="#" className="inline-block bg-indigo-600 text-white font-bold py-4 px-10 hover:bg-indigo-700 transition-colors text-lg shadow-lg">
                    Únete a Nuestro Discord
                </a>
            </div>

        </div>
    );
};


const PlayerDetailModal = ({ player, onClose }) => {
    if (!player) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-950 w-full max-w-md mx-auto border border-gray-200 dark:border-gray-700 shadow-lg p-6 animate-fade-in" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{player.name}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="flex flex-col items-center">
                    <img src={player.league.iconUrls.medium} alt={player.league.name} className="w-40 h-40 rounded-full border-4 border-gray-200 dark:border-gray-600" />
                    <p className="text-blue-600 dark:text-blue-400 font-semibold my-3 text-lg">{({ leader: 'Líder', coLeader: 'Co-líder', admin: 'Veterano', member: 'Miembro' })[player.role] || player.role}</p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Trofeos</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{player.trophies}</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Ayuntamiento</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{player.townHallLevel}</p>
                    </div>
                     <div className="bg-gray-100 dark:bg-gray-800 p-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Donaciones</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{player.donations}</p>
                    </div>
                     <div className="bg-gray-100 dark:bg-gray-800 p-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Donaciones Recibidas</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{player.donationsReceived}</p>
                    </div>
                </div>
                 <button onClick={onClose} className="mt-6 w-full bg-black text-white font-bold py-3 dark:bg-gray-900 hover:bg-gray-800 transition-colors">
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default function App() {
  const [page, setPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedWar, setSelectedWar] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  const [clanInfo, setClanInfo] = useState(null);
  const [warLog, setWarLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchClanData = async () => {
      setLoading(true);
      setError(null);
      const NETLIFY_FUNCTION_URL = `/.netlify/functions/clash-api`;

      try {
        const response = await fetch(NETLIFY_FUNCTION_URL);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error del servidor: ${response.status}`);
        }
        const data = await response.json();
        setClanInfo(data.clanInfo);
        setWarLog(data.warLog.items.filter(war=> war.result != null));
      } catch (err) {
        console.error("Error fetching data from Netlify Function:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClanData();
  }, []);

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

  const handleWarClick = (war) => {
    setSelectedWar(war);
    setPage('warDetail');
  };

  const handleBackToSchedule = () => {
    setSelectedWar(null);
    setPage('schedule');
  };

  const handlePlayerClick = (player) => {
      setSelectedPlayer(player);
  }

  const handleCloseModal = () => {
      setSelectedPlayer(null);
  }
  
  const renderPage = () => {
      if (loading) return <LoadingSpinner />;
      if (error) return <ErrorMessage message={error} />;

      switch (page) {
        case 'team':
          return <TeamPage clanInfo={clanInfo} onPlayerClick={handlePlayerClick} />;
        case 'schedule':
          return <SchedulePage warLog={warLog} onWarClick={handleWarClick} />;
        case 'warDetail':
          return <WarDetailPage war={selectedWar} onBack={handleBackToSchedule} />;
        case 'join':
          return <JoinUsPage clanTag={clanInfo?.tag} />;
        case 'home':
        default:
          return <HomePage setPage={setPage} />;
      }
  };
  
  return (
    <div className="min-h-screen font-sans bg-gray-50 text-gray-800 dark:bg-black dark:text-gray-200 transition-colors duration-300">
      <header className="bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <a href="#home" onClick={(e) => { e.preventDefault(); setPage('home'); }} className="flex items-center gap-3">
              {clanInfo ? <img src={clanInfo.badgeUrls.small} alt="Escudo del Clan" className="h-10 w-10"/> : <Shield className="h-8 w-8 text-gray-800 dark:text-gray-200" /> }
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-wider">iNFAMY</span>
            </a>
            <div className="flex items-center gap-4">
              <nav className="hidden lg:flex items-center">
                <NavLink page="home" setPage={setPage} currentPage={page}>Inicio</NavLink>
                <NavLink page="team" setPage={setPage} currentPage={page}>Equipo</NavLink>
                <NavLink page="schedule" setPage={setPage} currentPage={page}>Calendario</NavLink>
                <NavLink page="join" setPage={setPage} currentPage={page}>Únete</NavLink>
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
                <NavLink page="home" setPage={setPage} currentPage={page} isMobile closeMenu={() => setIsMenuOpen(false)}>Inicio</NavLink>
                <NavLink page="team" setPage={setPage} currentPage={page} isMobile closeMenu={() => setIsMenuOpen(false)}>Equipo</NavLink>
                <NavLink page="schedule" setPage={setPage} currentPage={page} isMobile closeMenu={() => setIsMenuOpen(false)}>Calendario</NavLink>
                <NavLink page="join" setPage={setPage} currentPage={page} isMobile closeMenu={() => setIsMenuOpen(false)}>Únete</NavLink>
            </div>
            <div className="flex items-center justify-between py-4 px-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex gap-4">
                    <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white"><Twitter/></a>
                    <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white"><Youtube/></a>
                    <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white"><Twitch/></a>
                </div>
                <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800">
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
            </div>
          </div>
        )}
      </header>

      <div className={`transition-filter duration-300 ${selectedPlayer ? 'blur-sm' : ''}`}>
        <main className="container mx-auto px-4 py-8">
          {renderPage()}
        </main>
        <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 mt-12">
          <div className="container mx-auto py-6 px-4 text-center text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} iNFAMY Esports. Todos los Derechos Reservados.</p>
            <p className="text-sm mt-2">Este es un sitio web conceptual y no está afiliado a Supercell o sus socios.</p>
          </div>
        </footer>
      </div>

       <PlayerDetailModal player={selectedPlayer} onClose={handleCloseModal} />

    </div>
  );
}
