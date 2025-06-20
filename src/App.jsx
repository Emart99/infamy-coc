import { useState, useEffect } from 'react';
import { Shield, Swords, Calendar, Users, Twitter, Youtube, Twitch, Menu, X, Crown, Skull, LogIn, Award, LoaderCircle, AlertTriangle } from 'lucide-react';

const sponsors = [
    { name: 'GamerFuel', logo: 'https://placehold.co/200x100/1a202c/475569?text=GamerFuel' },
    { name: 'Nexus Controllers', logo: 'https://placehold.co/200x100/1a202c/475569?text=Nexus' },
    { name: 'Volt Gaming Chairs', logo: 'https://placehold.co/200x100/1a202c/475569?text=Volt' },
    { name: 'Quantum Fiber', logo: 'https://placehold.co/200x100/1a202c/475569?text=Quantum' },
];

const NavLink = ({ href, children, Icon, closeMenu }) => {
  const handleClick = (e) => {
    if (closeMenu) {
      closeMenu();
    }
  };

  return (
    <a href={href} onClick={handleClick} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </a>
  );
};

const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-24">
        <LoaderCircle className="w-12 h-12 text-blue-500 animate-spin" />
    </div>
);

const ErrorMessage = ({ message }) => (
    <div className="flex flex-col items-center justify-center text-center bg-red-900/20 border border-red-500/30 rounded-lg p-6 my-8">
        <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
        <h3 className="text-xl font-bold text-red-400">Ocurrió un Error al Cargar los Datos</h3>
        <p className="text-red-300 mt-2">{message}</p>
        <p className="text-xs text-gray-400 mt-4">
           Asegúrate de que la Netlify Function esté desplegada y funcionando correctamente.
        </p>
    </div>
);


export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clanInfo, setClanInfo] = useState(null);
  const [warLog, setWarLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchClanData = async () => {
      setLoading(true);
      setError(null);
      
      // La URL ahora apunta a tu propia Netlify Function.
      // Esta función se encargará de llamar a la API de Supercell de forma segura.
      const NETLIFY_FUNCTION_URL = `/.netlify/functions/clash-api`;

      try {
        const response = await fetch(NETLIFY_FUNCTION_URL);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error del servidor: ${response.status}`);
        }
        
        const data = await response.json();

        setClanInfo(data.clanInfo);
        setWarLog(data.warLog.items);

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
    document.body.classList.add('bg-gray-900', 'text-gray-100');
    const style = document.createElement('style');
    style.innerHTML = `
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 5rem;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fadeIn 0.5s ease-in-out;
      }
    `;
    document.head.appendChild(style);
    return () => {
        document.head.removeChild(style);
    };
  }, []);

  const formatRole = (role) => {
    const roles = {
        leader: 'Líder',
        coLeader: 'Co-líder',
        admin: 'Veterano',
        member: 'Miembro'
    };
    return roles[role] || role;
  }

  const formatWarResult = (result) => {
      if (!result) return { text: 'En curso', color: 'yellow' };
      const results = {
          win: { text: 'Victoria', color: 'green' },
          lose: { text: 'Derrota', color: 'red' },
          tie: { text: 'Empate', color: 'gray' },
      };
      return results[result] || { text: result, color: 'gray' };
  }

  const formatISODate = (isoDate) => {
      if (!isoDate) return 'Fecha no disponible';
      const year = isoDate.substring(0, 4);
      const month = isoDate.substring(4, 6);
      const day = isoDate.substring(6, 8);
      const date = new Date(`${year}-${month}-${day}`);
      return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <header className="bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <a href="#inicio" className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white tracking-wider">{clanInfo ? clanInfo.name : 'iNFAMY'}</span>
            </a>
            <nav className="hidden lg:flex items-center space-x-1">
              <NavLink href="#inicio" Icon={Crown}>Inicio</NavLink>
              <NavLink href="#equipo" Icon={Users}>Equipo</NavLink>
              <NavLink href="#calendario" Icon={Calendar}>Calendario</NavLink>
              <NavLink href="#patrocinadores" Icon={Award}>Patrocinadores</NavLink>
              <NavLink href="#unete" Icon={LogIn}>Únete</NavLink>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-white"><Twitter/></a>
                <a href="#" className="text-gray-400 hover:text-white"><Youtube/></a>
                <a href="#" className="text-gray-400 hover:text-white"><Twitch/></a>
            </div>
            <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white focus:outline-none">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <NavLink href="#inicio" Icon={Crown} closeMenu={() => setIsMenuOpen(false)}>Inicio</NavLink>
                <NavLink href="#equipo" Icon={Users} closeMenu={() => setIsMenuOpen(false)}>Equipo</NavLink>
                <NavLink href="#calendario" Icon={Calendar} closeMenu={() => setIsMenuOpen(false)}>Calendario</NavLink>
                <NavLink href="#patrocinadores" Icon={Award} closeMenu={() => setIsMenuOpen(false)}>Patrocinadores</NavLink>
                <NavLink href="#unete" Icon={LogIn} closeMenu={() => setIsMenuOpen(false)}>Únete</NavLink>
            </div>
            <div className="flex items-center justify-center space-x-6 py-4 border-t border-gray-700">
                <a href="#" className="text-gray-400 hover:text-white"><Twitter/></a>
                <a href="#" className="text-gray-400 hover:text-white"><Youtube/></a>
                <a href="#" className="text-gray-400 hover:text-white"><Twitch/></a>
            </div>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4">
        <section id="inicio" className="pt-8 animate-fade-in">
          <div className="relative bg-gray-800 rounded-lg overflow-hidden my-8">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <img src={clanInfo ? clanInfo.badgeUrls.large : "https://placehold.co/1200x600/020617/1e293b?text=iNFAMY"} alt="Banner del Equipo" className="w-full h-auto object-cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <Crown className="h-16 w-16 text-yellow-400 drop-shadow-lg animate-pulse" />
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight uppercase" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                {clanInfo ? clanInfo.name : 'Cargando...'}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                {clanInfo ? clanInfo.description : 'Forjados en la Batalla. Unidos por la Victoria. La Cima de los Esports de Clash of Clans.'}
              </p>
              <a href="#equipo" className="mt-8 inline-block bg-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 shadow-lg">
                Conoce al Equipo
              </a>
            </div>
          </div>
        </section>

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && clanInfo && (
        <>
            <section id="equipo" className="py-24 animate-fade-in">
              <h1 className="text-4xl font-extrabold text-white mb-2">Nuestro Equipo</h1>
              <p className="text-gray-400 mb-8">Los arquitectos de la victoria. Conoce a los jugadores que dominan la escena competitiva.</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {clanInfo.memberList.map(member => (
                  <div key={member.tag} className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700 hover:border-blue-500 transition-colors duration-300">
                    <img src={member.league.iconUrls.medium} alt={member.league.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-600" />
                    <h2 className="text-2xl font-bold text-white">{member.name}</h2>
                    <p className="text-blue-400 font-semibold mb-3">{formatRole(member.role)}</p>
                    <div className="flex justify-center gap-6 text-gray-300">
                      <span>AYTO: {member.townHallLevel}</span>
                      <span>Trofeos: {member.trophies}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="calendario" className="py-24 animate-fade-in">
              <h1 className="text-4xl font-extrabold text-white mb-2">Registro de Guerra</h1>
              <p className="text-gray-400 mb-8">Resultados de nuestras batallas más recientes en las guerras de clanes.</p>
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                  <ul className="divide-y divide-gray-700">
                      {warLog.slice(0, 10).map((war, index) => {
                          const resultStyle = formatWarResult(war.result);
                          const resultColorClasses = {
                            green: 'bg-green-500/20 text-green-400',
                            red: 'bg-red-500/20 text-red-400',
                            yellow: 'bg-yellow-500/20 text-yellow-400',
                            gray: 'bg-gray-500/20 text-gray-400'
                          }

                          return (
                          <li key={index} className="p-4 md:p-6 grid grid-cols-2 md:grid-cols-3 items-center gap-4">
                              <div className="flex items-center gap-4">
                                  <img src={war.opponent.badgeUrls.small} alt="escudo oponente" className="w-10 h-10"/>
                                  <div>
                                      <span className="font-bold text-white text-lg">{war.opponent.name}</span>
                                      <span className="block text-gray-400 text-sm">Fin: {formatISODate(war.endTime)}</span>
                                  </div>
                              </div>
                              <div className="text-right md:text-center">
                                  <span className={`px-4 py-1 rounded-full text-sm font-bold ${resultColorClasses[resultStyle.color]}`}>{resultStyle.text}</span>
                              </div>
                              <div className="col-span-2 md:col-span-1 text-right text-lg font-bold text-white">
                                  <span>{war.clan.stars} <span className="text-yellow-400">★</span></span>
                                  <span className="mx-2 text-gray-500">-</span>
                                  <span>{war.opponent.stars} <span className="text-yellow-400">★</span></span>
                              </div>
                          </li>
                      )}
                    )}
                  </ul>
              </div>
            </section>
        </>
        )}
        
        <section id="patrocinadores" className="py-24 animate-fade-in">
          <h1 className="text-4xl font-extrabold text-white mb-2">Nuestros Patrocinadores</h1>
          <p className="text-gray-400 mb-8">Estamos orgullosos de asociarnos con líderes de la industria que apoyan nuestro camino hacia la victoria.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {sponsors.map(sponsor => (
                  <div key={sponsor.name} className="bg-gray-800 p-6 rounded-lg flex justify-center items-center transform hover:scale-105 transition-transform duration-300">
                      <img src={sponsor.logo} alt={sponsor.name} className="max-w-full h-auto" />
                  </div>
              ))}
          </div>
        </section>

        <section id="unete" className="py-24 animate-fade-in">
          <h1 className="text-4xl font-extrabold text-white mb-2">Únete a iNFAMY</h1>
          <p className="text-gray-400 mb-8">¿Crees que tienes lo necesario para competir al más alto nivel? Rellena el formulario para postularte.</p>
          <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-8 border border-gray-700">
              <form onSubmit={(e) => { e.preventDefault(); alert('¡Solicitud enviada! La revisaremos pronto.'); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label htmlFor="ign" className="block text-sm font-medium text-gray-300 mb-2">Nombre en el Juego</label>
                          <input type="text" id="ign" name="ign" className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500" required />
                      </div>
                      <div>
                          <label htmlFor="playerTag" className="block text-sm font-medium text-gray-300 mb-2">Etiqueta de Jugador (#XXXXXXX)</label>
                          <input type="text" id="playerTag" name="playerTag" className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500" required />
                      </div>
                  </div>
                  <div className="mt-6">
                      <label htmlFor="thLevel" className="block text-sm font-medium text-gray-300 mb-2">Nivel de Ayuntamiento</label>
                      <input type="number" id="thLevel" name="thLevel" min="10" max="16" className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500" required />
                  </div>
                  <div className="mt-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">¿Por qué quieres unirte?</label>
                      <textarea id="message" name="message" rows="4" className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500" required></textarea>
                  </div>
                  <div className="mt-8 text-right">
                      <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                          Enviar Solicitud
                      </button>
                  </div>
              </form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="container mx-auto py-6 px-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} iNFAMY Esports. Todos los Derechos Reservados.</p>
          <p className="text-sm mt-2">Este es un sitio web conceptual y no está afiliado a Supercell o sus socios.</p>
        </div>
      </footer>
    </div>
  );
}


