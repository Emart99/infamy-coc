
import React, { useState, useEffect } from 'react';
import { Shield, Swords, Calendar, Users, Twitter, Youtube, Twitch, Menu, X, Crown, Skull, LogIn, Award, LoaderCircle, AlertTriangle, ArrowLeft, Star, Percent } from 'lucide-react';

const sponsors = [
    { name: 'GamerFuel', logo: 'https://placehold.co/200x100/e5e7eb/4b5563?text=GamerFuel' },
    { name: 'Nexus Controllers', logo: 'https://placehold.co/200x100/e5e7eb/4b5563?text=Nexus' },
    { name: 'Volt Gaming Chairs', logo: 'https://placehold.co/200x100/e5e7eb/4b5563?text=Volt' },
    { name: 'Quantum Fiber', logo: 'https://placehold.co/200x100/e5e7eb/4b5563?text=Quantum' },
];


const NavLink = ({ page, setPage, currentPage, children, Icon, isMobile, closeMenu }) => {
  const isActive = page === currentPage;
  const baseClasses = "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeClasses = "text-white bg-black w-full";
  const inactiveClasses = "text-gray-600 hover:bg-gray-200 hover:text-gray-900";
  const handleClick = (e) => {
    e.preventDefault();
    setPage(page);
    if (isMobile && closeMenu) {
      closeMenu();
    }
  };
  return (
    <a href={`#${page}`} onClick={handleClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </a>
  );
};

const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-24">
        <LoaderCircle className="w-12 h-12 text-blue-600 animate-spin" />
    </div>
);

const ErrorMessage = ({ message }) => (
    <div className="flex flex-col items-center justify-center text-center bg-red-100 border border-red-200 rounded-lg p-6 my-8">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-red-700">Ocurrió un Error al Cargar los Datos</h3>
        <p className="text-red-600 mt-2">{message}</p>
        <p className="text-xs text-gray-500 mt-4">
           Asegúrate de que la Netlify Function esté desplegada y funcionando correctamente.
        </p>
    </div>
);



const HomePage = ({ setPage }) => (
    <div className="animate-fade-in">
        <div className="relative bg-gray-200 rounded-lg overflow-hidden my-8 border border-gray-200">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <img src="https://placehold.co/1200x600/e5e7eb/4b5563?text=iNFAMY" alt="Banner del Equipo" className="w-full h-auto object-cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <Shield className="h-16 w-16 text-red-500 drop-shadow-lg animate-pulse" />
                <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight uppercase" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                    iNFAMY
                </h1>
                <p className="mt-4 text-lg md:text-xl text-white max-w-2xl" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                    Aniquilando aldeas y forjando leyendas. Somos la élite. Somos iNFAMY.
                </p>
                <button onClick={() => setPage('team')} className="mt-8 inline-block bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-black transition-transform transform hover:scale-105 shadow-lg">
                    Conoce al Equipo
                </button>
            </div>
        </div>
    </div>
);

const TeamPage = ({ clanInfo }) => {
    const roleOrder = {
        leader: 1,
        coLeader: 2,
        admin: 3,
        member: 4
    };

    const sortedMembers = [...(clanInfo?.memberList || [])].sort((a, b) => {
        return (roleOrder[a.role] || 5) - (roleOrder[b.role] || 5);
    });
    
    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Nuestro Equipo</h1>
            <p className="text-gray-600 mb-8">Los arquitectos de la victoria. Conoce a los jugadores que dominan la escena competitiva.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {sortedMembers.map(member => (
                    <div key={member.tag} className="bg-white rounded-lg p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow">
                        <img src={member.league.iconUrls.medium} alt={member.league.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-200" />
                        <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
                        <p className="text-blue-600 font-semibold mb-3">{({ leader: 'Líder', coLeader: 'Co-líder', admin: 'Veterano', member: 'Miembro' })[member.role] || member.role}</p>
                        <div className="flex justify-center gap-6 text-gray-700">
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
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Registro de Guerra</h1>
        <p className="text-gray-600 mb-8">Resultados de nuestras batallas más recientes. Haz clic en una guerra para ver más detalles.</p>
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
            <ul className="divide-y divide-gray-200">
                {warLog.slice(0, 15).map((war, index) => {
                    const resultStyle = (r => (!r ? { text: 'En curso', color: 'yellow' } : { win: { text: 'Victoria', color: 'green' }, lose: { text: 'Derrota', color: 'red' }, tie: { text: 'Empate', color: 'gray' } }[r] || { text: r, color: 'gray' }))(war.result);
                    const resultColorClasses = { green: 'bg-green-100 text-green-800', red: 'bg-red-100 text-red-800', yellow: 'bg-yellow-100 text-yellow-800', gray: 'bg-gray-100 text-gray-800' };
                    return (
                        <li key={index} onClick={() => onWarClick(war)} className="p-4 md:p-6 grid grid-cols-2 md:grid-cols-3 items-center gap-4 hover:bg-gray-50 cursor-pointer transition-colors">
                            <div className="flex items-center gap-4">
                                <img src={war.opponent.badgeUrls.small} alt="escudo oponente" className="w-10 h-10"/>
                                <div>
                                    <span className="font-bold text-gray-900 text-lg">{war.opponent.name}</span>
                                    <span className="block text-gray-500 text-sm">Fin: {(iso => iso ? new Date(`${iso.substring(0,4)}-${iso.substring(4,6)}-${iso.substring(6,8)}`).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : '')(war.endTime)}</span>
                                </div>
                            </div>
                            <div className="text-right md:text-center">
                                <span className={`px-4 py-1 rounded-full text-sm font-bold ${resultColorClasses[resultStyle.color]}`}>{resultStyle.text}</span>
                            </div>
                            <div className="col-span-2 md:col-span-1 text-right text-lg font-bold text-gray-900">
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
    const Attack = ({ attack, attackerName, defenderName }) => {
        if (!attack) return null;

        return (
            <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between border border-gray-200">
                <div>
                    <p className="font-bold text-gray-800">{attackerName}</p>
                    <p className="text-xs text-gray-500">atacó a {defenderName}</p>
                </div>
                <div className="flex items-center gap-3 text-right">
                    <span className="text-sm text-gray-600 flex items-center gap-1">{attack.destructionPercentage}% <Percent size={14} /></span>
                    <div className="flex">
                        {[...Array(3)].map((_, i) => (
                            <Star key={i} size={16} className={i < attack.stars ? 'text-yellow-500 fill-current' : 'text-gray-300'} />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    if (!war) {
        return (
            <div className="animate-fade-in text-center">
                <p className="text-gray-600">No se ha seleccionado ninguna guerra para ver.</p>
                <button onClick={onBack} className="mt-4 flex items-center mx-auto gap-2 text-blue-600 hover:text-blue-800">
                    <ArrowLeft size={20} />
                    Volver al Calendario
                </button>
            </div>
        );
    }
    
    return (
        <div className="animate-fade-in">
            <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 font-medium">
                <ArrowLeft size={20} />
                Volver al Calendario
            </button>

            <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center align-center">
                    <div className="flex items-center gap-4 justify-start">
                        <img src={war.clan.badgeUrls.medium} alt={war.clan.name} className="w-16 h-16"/>
                        <span className="text-2xl md:text-3xl font-bold text-gray-900">{war.clan.name}</span>
                    </div>
                    <span className="text-2xl font-bold my-4 md:my-0  self-center">VS</span>
                    <div className="flex items-center gap-4 flex-row-reverse">
                        <img src={war.opponent.badgeUrls.medium} alt={war.opponent.name} className="w-16 h-16"/>
                        <span className="text-2xl md:text-3xl font-bold text-gray-900">{war.opponent.name}</span>
                    </div>
                </div>
                 <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="text-4xl font-bold text-yellow-500 flex items-center justify-center gap-2">{war.clan.stars} <Star /></div>
                        <div className="text-gray-500 text-sm mt-1">Estrellas (Nuestro Clan)</div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <div className={`text-4xl font-bold ${war.result === 'win' ? 'text-green-600' : war.result === 'lose' ? 'text-red-600' : 'text-gray-500'}`}>{({win: 'VICTORIA', lose: 'DERROTA', tie: 'EMPATE'})[war.result] || 'EN CURSO'}</div>
                        <div className="text-gray-500 text-sm mt-1">Resultado Final</div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="text-4xl font-bold text-yellow-500 flex items-center justify-center gap-2">{war.opponent.stars} <Star /></div>
                        <div className="text-gray-500 text-sm mt-1">Estrellas (Oponente)</div>
                    </div>
                </div>
            </div>
            
            <div className="mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Registro de Ataques</h2>
                {(war.clan.members?.length > 0 || war.opponent.members?.length > 0) ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-blue-700 mb-4">Ataques de {war.clan.name}</h3>
                            <div className="space-y-3">
                                {war.clan.members?.map(member => (
                                    member.attacks?.map(attack => (
                                        <Attack key={attack.attackerTag + attack.defenderTag} attack={attack} attackerName={member.name} defenderName={war.opponent.members.find(m => m.tag === attack.defenderTag)?.name || 'Desconocido'} />
                                    ))
                                ))}
                            </div>
                        </div>
                         <div>
                            <h3 className="text-xl font-bold text-red-700 mb-4">Ataques de {war.opponent.name}</h3>
                            <div className="space-y-3">
                                 {war.opponent.members?.map(member => (
                                    member.attacks?.map(attack => (
                                        <Attack key={attack.attackerTag + attack.defenderTag} attack={attack} attackerName={member.name} defenderName={war.clan.members.find(m => m.tag === attack.defenderTag)?.name || 'Desconocido'} />
                                    ))
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center bg-gray-100 p-6 rounded-lg">
                         <p className="text-gray-600">La información detallada de los ataques individuales no está disponible en el historial público de guerras. Solo se puede acceder a estos datos para la guerra en curso.</p>
                    </div>
                )}
            </div>
        </div>
    );
}


const SponsorsPage = () => (
    <div className="animate-fade-in">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Nuestros Patrocinadores</h1>
        <p className="text-gray-600 mb-8">Estamos orgullosos de asociarnos con líderes de la industria que apoyan nuestro camino hacia la victoria.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {sponsors.map(sponsor => (
                <div key={sponsor.name} className="bg-white border border-gray-200 p-6 rounded-lg flex justify-center items-center transform hover:shadow-xl transition-shadow">
                    <img src={sponsor.logo} alt={sponsor.name} className="max-w-full h-auto" />
                </div>
            ))}
        </div>
    </div>
);

const JoinUsPage = () => (
    <div className="animate-fade-in">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Únete a iNFAMY</h1>
        <p className="text-gray-600 mb-8">¿Crees que tienes lo necesario para competir al más alto nivel? Rellena el formulario para postularte.</p>
        <div className="max-w-2xl mx-auto bg-white rounded-lg p-8 border border-gray-200">
            <form onSubmit={(e) => { e.preventDefault(); alert('¡Solicitud enviada! La revisaremos pronto.'); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="ign" className="block text-sm font-medium text-gray-700 mb-2">Nombre en el Juego</label>
                        <input type="text" id="ign" name="ign" className="w-full bg-gray-100 border-gray-300 text-gray-900 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="playerTag" className="block text-sm font-medium text-gray-700 mb-2">Etiqueta de Jugador (#XXXXXXX)</label>
                        <input type="text" id="playerTag" name="playerTag" className="w-full bg-gray-100 border-gray-300 text-gray-900 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                </div>
                <div className="mt-6">
                    <label htmlFor="thLevel" className="block text-sm font-medium text-gray-700 mb-2">Nivel de Ayuntamiento</label>
                    <input type="number" id="thLevel" name="thLevel" min="10" max="16" className="w-full bg-gray-100 border-gray-300 text-gray-900 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div className="mt-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">¿Por qué quieres unirte?</label>
                    <textarea id="message" name="message" rows="4" className="w-full bg-gray-100 border-gray-300 text-gray-900 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500" required></textarea>
                </div>
                <div className="mt-8 text-right">
                    <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                        Enviar Solicitud
                    </button>
                </div>
            </form>
        </div>
    </div>
);


// --- COMPONENTE PRINCIPAL ---

export default function App() {
  const [page, setPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedWar, setSelectedWar] = useState(null);

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
    document.body.classList.add('bg-gray-50', 'text-gray-800');
    const style = document.createElement('style');
    style.innerHTML = `html { scroll-behavior: smooth; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }`;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const handleWarClick = (war) => {
    setSelectedWar(war);
    setPage('warDetail');
  };

  const handleBackToSchedule = () => {
    setSelectedWar(null);
    setPage('schedule');
  };
  
  const renderPage = () => {
      if (loading) return <LoadingSpinner />;
      if (error) return <ErrorMessage message={error} />;

      switch (page) {
        case 'team':
          return <TeamPage clanInfo={clanInfo} />;
        case 'schedule':
          return <SchedulePage warLog={warLog} onWarClick={handleWarClick} />;
        case 'warDetail':
          return <WarDetailPage war={selectedWar} onBack={handleBackToSchedule} />;
        case 'sponsors':
          return <SponsorsPage />;
        case 'join':
          return <JoinUsPage />;
        case 'home':
        default:
          return <HomePage setPage={setPage} />;
      }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <a href="#home" onClick={(e) => { e.preventDefault(); setPage('home'); }} className="flex items-center gap-3">
              {clanInfo ? <img src={clanInfo.badgeUrls.small} alt="Escudo del Clan" className="h-10 w-10"/> : <Shield className="h-8 w-8 text-blue-600" /> }
              <span className="text-xl font-bold text-gray-900 tracking-wider">iNFAMY</span>
            </a>
            <nav className="hidden lg:flex items-center space-x-1">
              <NavLink page="home" setPage={setPage} currentPage={page} Icon={Crown}>Inicio</NavLink>
              <NavLink page="team" setPage={setPage} currentPage={page} Icon={Users}>Equipo</NavLink>
              <NavLink page="schedule" setPage={setPage} currentPage={page} Icon={Calendar}>Calendario</NavLink>
              <NavLink page="sponsors" setPage={setPage} currentPage={page} Icon={Award}>Patrocinadores</NavLink>
              <NavLink page="join" setPage={setPage} currentPage={page} Icon={LogIn}>Únete</NavLink>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-900"><Twitter/></a>
                <a href="#" className="text-gray-500 hover:text-gray-900"><Youtube/></a>
                <a href="#" className="text-gray-500 hover:text-gray-900"><Twitch/></a>
            </div>
            <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <NavLink page="home" setPage={setPage} currentPage={page} Icon={Crown} isMobile closeMenu={() => setIsMenuOpen(false)}>Inicio</NavLink>
                <NavLink page="team" setPage={setPage} currentPage={page} Icon={Users} isMobile closeMenu={() => setIsMenuOpen(false)}>Equipo</NavLink>
                <NavLink page="schedule" setPage={setPage} currentPage={page} Icon={Calendar} isMobile closeMenu={() => setIsMenuOpen(false)}>Calendario</NavLink>
                <NavLink page="sponsors" setPage={setPage} currentPage={page} Icon={Award} isMobile closeMenu={() => setIsMenuOpen(false)}>Patrocinadores</NavLink>
                <NavLink page="join" setPage={setPage} currentPage={page} Icon={LogIn} isMobile closeMenu={() => setIsMenuOpen(false)}>Únete</NavLink>
            </div>
            <div className="flex items-center justify-center space-x-6 py-4 border-t border-gray-200">
                <a href="#" className="text-gray-500 hover:text-gray-900"><Twitter/></a>
                <a href="#" className="text-gray-500 hover:text-gray-900"><Youtube/></a>
                <a href="#" className="text-gray-500 hover:text-gray-900"><Twitch/></a>
            </div>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto py-6 px-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} iNFAMY Esports. Todos los Derechos Reservados.</p>
          <p className="text-sm mt-2">Este es un sitio web conceptual y no está afiliado a Supercell o sus socios.</p>
        </div>
      </footer>
    </div>
  );
}