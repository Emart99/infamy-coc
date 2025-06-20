import React, { useState, useEffect } from 'react';
import { Shield, Twitter, Youtube, Twitch, Menu, X, LoaderCircle, AlertTriangle, ArrowLeft, Star, Sun, Moon, CheckCircle, Clipboard, Trophy, Swords } from 'lucide-react';

const sponsors = [
    { name: 'Nike', logo: '/sponsors/nike.svg' },
    { name: 'Yamaha', logo: '/sponsors/yamaha.svg' },
    { name: 'Corsair', logo: '/sponsors/corsair.svg' },
    { name: 'Intel', logo: '/sponsors/intel.svg' },
    { name: 'Logitech', logo: '/sponsors/logitech.svg' },
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
                <button onClick={() => setPage('team')} className="mt-10 inline-block bg-white text-black font-bold py-4 px-12 uppercase tracking-widest hover:bg-gray-200 transition-all transform hover:scale-105 shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                    Conoce al Equipo
                </button>
            </div>
        </div>
        <div className="mt-20 ">
            <h2 className="text-center text-2xl font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase mb-12">Nuestros Patrocinadores</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center">
                {sponsors.map(sponsor => (
                    <div key={sponsor.name} className="flex justify-center items-center transform hover:scale-110 transition-transform grayscale hover:grayscale-0 opacity-60 hover:opacity-100">
                        <img src={sponsor.logo} alt={sponsor.name} className="max-w-full h-auto dark:invert" />
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
                            <span>TH: {member.townHallLevel}</span>
                            <span>Trofeos: {member.trophies}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SchedulePage = ({ warLog, currentWar, onWarClick }) => (
    <div className="animate-fade-in">
        {currentWar && currentWar.state === 'inWar' && (
            <div className="mb-16">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Guerra en Vivo</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">¡La batalla es ahora! Haz clic para ver los detalles.</p>
                <div onClick={() => onWarClick(currentWar)} className="bg-white dark:bg-gray-950 p-6 md:p-8 border-2 border-red-500 shadow-lg relative overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow">
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold uppercase px-3 py-1 animate-pulse">En Vivo</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center items-center">
                        <div className="flex items-center gap-4 justify-center md:justify-start">
                            <img src={currentWar.clan.badgeUrls.medium} alt={currentWar.clan.name} className="w-16 h-16" />
                            <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{currentWar.clan.name}</span>
                        </div>
                        <span className="text-2xl font-bold my-4 md:my-0 self-center dark:text-gray-400">VS</span>
                        <div className="flex items-center gap-4 flex-row-reverse md:flex-row md:justify-end">
                            <img src={currentWar.opponent.badgeUrls.medium} alt={currentWar.opponent.name} className="w-16 h-16" />
                            <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{currentWar.opponent.name}</span>
                        </div>
                    </div>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="bg-gray-100 dark:bg-gray-800 p-4">
                            <div className="text-4xl font-bold text-yellow-500 flex items-center justify-center gap-2">{currentWar.clan.stars} <Star /></div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 flex flex-col justify-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentWar.clan.attacks}/{currentWar.opponent.attacks}</div>
                            <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">Ataques</div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4">
                            <div className="text-4xl font-bold text-yellow-500 flex items-center justify-center gap-2">{currentWar.opponent.stars} <Star /></div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Historial de Guerra</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Resultados de nuestras batallas más recientes.</p>
        <div className="bg-white dark:bg-gray-950 overflow-hidden border border-gray-200 dark:border-gray-700">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {warLog.slice(0, 15).map((war, index) => {
                    const resultStyle = (r => (!r ? { text: 'En curso', color: 'yellow' } : { win: { text: 'Victoria', color: 'green' }, lose: { text: 'Derrota', color: 'red' }, tie: { text: 'Empate', color: 'gray' } }[r] || { text: r, color: 'gray' }))(war.result);
                    const resultColorClasses = { green: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300', red: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300', yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300', gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' };
                    return (
                        <li key={index} className="p-4 md:p-6 grid grid-cols-2 md:grid-cols-3 items-center gap-4">
                            <div className="flex items-center gap-4">
                                <img src={war.opponent.badgeUrls.small} alt="escudo oponente" className="w-10 h-10" />
                                <div>
                                    <span className="font-bold text-gray-900 dark:text-white text-lg">{war.opponent.name}</span>
                                    <span className="block text-gray-500 dark:text-gray-400 text-sm">Fin: {(iso => iso ? new Date(`${iso.substring(0, 4)}-${iso.substring(4, 6)}-${iso.substring(6, 8)}`).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : '')(war.endTime)}</span>
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
                    )
                }
                )}
            </ul>
        </div>
    </div>
);

const WarDetailPage = ({ war, onBack }) => {
    if (!war) return null;

    const Attack = ({ attack, attackerName, defenderName }) => {
        if (!attack) return null; // No renderiza nada si no hubo ataque

        return (
            <div className="bg-gray-100 dark:bg-gray-800 p-3 flex items-center justify-between border-l-4 border-gray-400 dark:border-gray-600">
                <div>
                    <p className="font-bold text-gray-800 dark:text-gray-200">{attackerName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">atacó a {defenderName}</p>
                </div>
                <div className="flex items-center gap-3 text-right">
                    <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">{attack.destructionPercentage}%</span>
                    <div className="flex">
                        {[...Array(3)].map((_, i) => (
                            <Star key={i} size={16} className={i < attack.stars ? 'text-yellow-500 fill-current' : 'text-gray-600'} />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="animate-fade-in">
            <button onClick={onBack} className="inline-flex items-center gap-2 bg-black text-white font-bold py-2 px-4 mb-8 hover:bg-gray-800 transition-colors">
                <ArrowLeft size={16} />
                Volver al Calendario
            </button>
            <div className="bg-white dark:bg-gray-950 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center items-center">
                    <div className="flex items-center gap-4 justify-start">
                        <img src={war.clan.badgeUrls.medium} alt={war.clan.name} className="w-16 h-16" />
                        <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{war.clan.name}</span>
                    </div>
                    <span className="text-2xl font-bold my-4 md:my-0 self-center dark:text-gray-400">VS</span>
                    <div className="flex items-center gap-4 flex-row md:justify-end">
                        <img src={war.opponent.badgeUrls.medium} alt={war.opponent.name} className="w-16 h-16" />
                        <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{war.opponent.name}</span>
                    </div>
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4">
                        <div className="text-4xl font-bold text-yellow-500 flex items-center justify-center gap-2">{war.clan.stars} <Star /></div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">Estrellas (Nuestro Clan)</div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4">
                        <div className={`text-4xl font-bold ${war.result === 'win' ? 'text-green-600' : war.result === 'lose' ? 'text-red-600' : 'text-gray-500'}`}>{({ win: 'VICTORIA', lose: 'DERROTA', tie: 'EMPATE' })[war.result] || 'EN CURSO'}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">Resultado Final</div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4">
                        <div className="text-4xl font-bold text-yellow-500 flex items-center justify-center gap-2">{war.opponent.stars} <Star /></div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">Estrellas (Oponente)</div>
                    </div>
                </div>
            </div>
            {war.clan.members ? (
                <div className="mt-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Registro de Ataques</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">Ataques de {war.clan.name}</h3>
                            <div className="space-y-3">
                                {war.clan.members?.map(member => (
                                    member.attacks?.map((attack, index) => (
                                        <Attack key={`${member.tag}-${index}`} attack={attack} attackerName={member.name} defenderName={war.opponent.members.find(m => m.tag === attack.defenderTag)?.name || 'Desconocido'} />
                                    ))
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-4">Ataques de {war.opponent.name}</h3>
                            <div className="space-y-3">
                                {war.opponent.members?.map(member => (
                                    member.attacks?.map((attack, index) => (
                                        <Attack key={`${member.tag}-${index}`} attack={attack} attackerName={member.name} defenderName={war.clan.members.find(m => m.tag === attack.defenderTag)?.name || 'Desconocido'} />
                                    ))
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-8 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-6 text-center">
                    <p className="text-red-700 dark:text-red-300">El detalle de ataques solo está disponible para guerras en curso.</p>
                </div>
            )}
        </div>
    );
}

const JoinUsPage = ({ clanTag }) => {
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
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-gray-700 dark:text-gray-300">Ayuntamiento Nivel 15+</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-gray-700 dark:text-gray-300">Héroes Nivel 80+</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-gray-700 dark:text-gray-300">Actividad en Guerras y Ligas de Guerra</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20} />
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

const HallOfFamePage = ({ clanInfo, onPlayerClick }) => {
    const topTrophies = [...(clanInfo?.memberList || [])].sort((a, b) => b.trophies - a.trophies).slice(0, 3);
    const topDonations = [...(clanInfo?.memberList || [])].sort((a, b) => b.donations - a.donations).slice(0, 3);
    const rankColors = ["text-yellow-400", "text-gray-400", "text-yellow-600"];

    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Salón de la Fama</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-12">Reconocimiento a los jugadores más destacados de iNFAMY.</p>

            <div className="space-y-16">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Top 3 - Trofeos</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {topTrophies.map((player, index) => (
                            <div key={player.tag} onClick={() => onPlayerClick(player)} className="bg-white dark:bg-gray-950 p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:bg-gray-800 transition-all cursor-pointer">
                                <span className={`text-5xl font-black ${rankColors[index]}`}>{index + 1}</span>
                                <img src={player.league.iconUrls.medium} alt={player.league.name} className="w-24 h-24 mx-auto my-4" />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{player.name}</h3>
                                <p className="text-blue-600 dark:text-blue-400 font-semibold">{player.trophies} Trofeos</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Top 3 - Donaciones</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {topDonations.map((player, index) => (
                            <div key={player.tag} onClick={() => onPlayerClick(player)} className="bg-white dark:bg-gray-950 p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:bg-gray-800 transition-all cursor-pointer">
                                <span className={`text-5xl font-black ${rankColors[index]}`}>{index + 1}</span>
                                <img src={player.league.iconUrls.medium} alt={player.league.name} className="w-24 h-24 mx-auto my-4" />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{player.name}</h3>
                                <p className="text-blue-600 dark:text-blue-400 font-semibold">{player.donations} Tropas Donadas</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Mejores Atacantes de Guerra</h2>
                    <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-8 text-center">
                        <p className="text-red-700 dark:text-red-300 text-lg">Estamos trabajando para implementar esta sección. ¡Próximamente!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const PlayerDetailModal = ({ player, onClose, detailedPlayer, isLoading }) => {
    const displayPlayer = detailedPlayer || player;

    if (!displayPlayer) return null;

    return (
        <div className="fixed inset-0 backdrop-blur flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-950 w-full max-w-xl mx-auto border border-gray-200 dark:border-gray-700 shadow-lg p-6 animate-fade-in" onClick={e => e.stopPropagation()}>
                {isLoading ? (
                    <div className="flex justify-center items-center h-96">
                        <LoaderCircle className="w-16 h-16 text-gray-800 dark:text-gray-200 animate-spin" />
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{displayPlayer.name}</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={displayPlayer.league.iconUrls.medium} alt={displayPlayer.league.name} className="w-40 h-40 " />
                            <p className="text-blue-600 dark:text-blue-400 font-semibold my-3 text-lg">{({ leader: 'Líder', coLeader: 'Co-líder', admin: 'Veterano', member: 'Miembro' })[displayPlayer.role] || displayPlayer.role}</p>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                            <div className="bg-gray-100 dark:bg-gray-800 p-4">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Trofeos</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{displayPlayer.trophies}</p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Máx. Trofeos</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{displayPlayer.bestTrophies}</p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Nivel de AY</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{displayPlayer.townHallLevel}</p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Estrellas de Guerra</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{displayPlayer.warStars}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="font-bold text-center mb-2 text-gray-800 dark:text-gray-200">Héroes</h3>
                            <div className="grid grid-cols-4 gap-2 text-center">
                                {displayPlayer.heroes?.map(hero => (
                                    <div key={hero.name} className="bg-gray-100 dark:bg-gray-800 p-2">
                                        <p className="text-xs">{hero.name.replace(' King', '').replace(' Queen', '').replace(' Warden', '').replace(' Champion', '')}</p>
                                        <p className="font-bold">{hero.level}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button onClick={onClose} className="mt-6 w-full bg-black dark:bg-gray-900 text-white font-bold py-3 hover:bg-gray-800 transition-colors">
                            Cerrar
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default function App() {
    const [page, setPage] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedWar, setSelectedWar] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [detailedPlayer, setDetailedPlayer] = useState(null);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    const [clanInfo, setClanInfo] = useState(null);
    const [warLog, setWarLog] = useState([]);
    const [currentWar, setCurrentWar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClanData = async () => {
            setLoading(true);
            setError(null);
            const CLASH_API_URL = `/.netlify/functions/clash-api`;
            const CURRENT_WAR_URL = `/.netlify/functions/get-current-war`;
            try {
                const [clanResponse, currentWarResponse] = await Promise.all([
                    fetch(CLASH_API_URL),
                    fetch(CURRENT_WAR_URL)
                ]);
                if (!clanResponse.ok) {
                    const errorData = await clanResponse.json();
                    throw new Error(errorData.message || `Error del servidor: ${clanResponse.status}`);
                }
                const clanData = await clanResponse.json();
                setClanInfo(clanData.clanInfo);
                setWarLog(clanData.warLog.items.filter(war => war.result != null));
                if (currentWarResponse.ok) {
                    const currentWarData = await currentWarResponse.json();
                    setCurrentWar(currentWarData);
                } else {
                    console.warn('No hay guerra en curso o no se pudo cargar.')
                }
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

        if (selectedPlayer) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [theme, selectedPlayer]);

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

    const handlePlayerClick = async (player) => {
        setSelectedPlayer(player);
        setIsModalLoading(true);
        setDetailedPlayer(null);

        const playerTag = player.tag.replace('#', '%23');
        const NETLIFY_FUNCTION_URL = `/.netlify/functions/get-player-details?tag=${playerTag}`;

        try {
            const response = await fetch(NETLIFY_FUNCTION_URL);
            if (!response.ok) {
                throw new Error('No se pudo cargar la información detallada del jugador.');
            }
            const data = await response.json();
            setDetailedPlayer(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsModalLoading(false);
        }
    }

    const handleCloseModal = () => {
        setSelectedPlayer(null);
        setDetailedPlayer(null);
    }

    const renderPage = () => {
        if (loading) return <LoadingSpinner />;
        if (error) return <ErrorMessage message={error} />;

        switch (page) {
            case 'team':
                return <TeamPage clanInfo={clanInfo} onPlayerClick={handlePlayerClick} />;
            case 'schedule':
                return <SchedulePage warLog={warLog} currentWar={currentWar} onWarClick={handleWarClick} />;
            case 'warDetail':
                return <WarDetailPage war={selectedWar} onBack={handleBackToSchedule} />;
            case 'hallOfFame':
                return <HallOfFamePage clanInfo={clanInfo} onPlayerClick={handlePlayerClick} />;
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
                            {clanInfo ? <img src={clanInfo.badgeUrls.small} alt="Escudo del Clan" className="h-10 w-10" /> : <Shield className="h-8 w-8 text-gray-800 dark:text-gray-200" />}
                            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-wider">iNFAMY</span>
                        </a>
                        <div className="flex items-center gap-4">
                            <nav className="hidden lg:flex items-center">
                                <NavLink page="home" setPage={setPage} currentPage={page}>Inicio</NavLink>
                                <NavLink page="team" setPage={setPage} currentPage={page}>Equipo</NavLink>
                                <NavLink page="schedule" setPage={setPage} currentPage={page}>Calendario</NavLink>
                                <NavLink page="hallOfFame" setPage={setPage} currentPage={page}>Salón de la Fama</NavLink>
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
                            <NavLink page="hallOfFame" setPage={setPage} currentPage={page} isMobile closeMenu={() => setIsMenuOpen(false)}>Salón de la Fama</NavLink>
                            <NavLink page="join" setPage={setPage} currentPage={page} isMobile closeMenu={() => setIsMenuOpen(false)}>Únete</NavLink>
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

            <PlayerDetailModal player={selectedPlayer} detailedPlayer={detailedPlayer} isLoading={isModalLoading} onClose={handleCloseModal} />

        </div>
    );
}