import { calculateWarHallOfFame, calculateWorstAttackers } from "../utils/warAttackAnalisis"; 
import { leagueNameToImage } from "../utils/leagueMap";
import { Star } from "lucide-react";

const HallOfFamePage = ({ clanInfo, warLog, onPlayerClick }) => {
    const topTrophies = [...(clanInfo?.memberList || [])].sort((a, b) => b.trophies - a.trophies).slice(0, 3);
    const topDonations = [...(clanInfo?.memberList || [])].sort((a, b) => b.donations - a.donations).slice(0, 3);
    const rankColors = ["text-yellow-400", "text-gray-400", "text-yellow-600"];

    const bestAttackers = calculateWarHallOfFame(warLog).slice(0, 4);
    const worstAttackers = calculateWorstAttackers(warLog).slice(0, 4);
    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Salón de la Fama</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-12">Reconocimiento a los jugadores más destacados de iNFAMY.</p>

            <div className="space-y-16">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Mejores atacantes en ultimas 10 guerras</h2>
                    {bestAttackers.length > 0 ? (
                        <div className="grid md:grid-cols-4 gap-8">
                            {bestAttackers.map((player, index) => (
                                <div key={player.tag} className="bg-white dark:bg-gray-950 p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:bg-gray-800 transition-all cursor-pointer">
                                    <span className={`text-5xl font-black ${rankColors[index]}`}>{index + 1}</span>
                                    <div className="my-2">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{player.name}</h3>
                                        <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg flex items-center justify-center ">
                                            {player.totalStars} Estrellas
                                        </p>
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                        <p>{player.averageStars} estrellas de promedio</p>
                                        <p>{player.totalAttacks} ataques realizados</p>
                                        <p>{player.threeStarAttacks} ataques de 3 estrellas</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-blue-100 dark:bg-blue-900/20 p-8 text-center border border-blue-200 dark:border-blue-500/30">
                            <p className="text-blue-700 dark:text-blue-300 text-lg">No hay suficientes datos de guerras para generar un ranking de atacantes. ¡A la guerra!</p>
                        </div>
                    )}
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Peores Atacantes promedio</h2>
                    {worstAttackers.length > 0 ? (
                        <div className="grid md:grid-cols-4 gap-8">
                            {worstAttackers.map((player, index) => (
                                <div key={player.tag} onClick={() => onPlayerClick(player)} className="bg-white dark:bg-gray-950 p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:bg-gray-800 transition-all cursor-pointer">
                                    <span className={`text-5xl font-black ${rankColors[index]}`}>{index + 1}</span>
                                    <div className="my-2">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{player.name}</h3>
                                        <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg flex items-center justify-center gap-2">
                                            {player.averageStars} Estrellas
                                        </p>
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                        <p>{player.totalStars} estrellas totales</p>
                                        <p>{player.totalAttacks} ataques realizados</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-100 dark:bg-gray-900/20 p-8 text-center border border-gray-200 dark:border-gray-500/30">
                            <p className="text-gray-700 dark:text-gray-300 text-lg">¡Excelente trabajo! No hay jugadores con promedios bajos que cumplan los requisitos.</p>
                        </div>
                    )}
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Trofeos</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {topTrophies.map((player, index) => (
                            <div key={player.tag}  className="bg-white dark:bg-gray-950 p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:bg-gray-800 transition-all cursor-pointer">
                                <span className={`text-5xl font-black ${rankColors[index]}`}>{index + 1}</span>
                                <img src={leagueNameToImage[player.league]} alt={player.league.name} className="w-24 h-24 mx-auto my-4" />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{player.name}</h3>
                                <p className="text-blue-600 dark:text-blue-400 font-semibold">{player.trophies} Trofeos</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Donaciones</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {topDonations.map((player, index) => (
                            <div key={player.tag}  className="bg-white dark:bg-gray-950 p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:bg-gray-800 transition-all cursor-pointer">
                                <span className={`text-5xl font-black ${rankColors[index]}`}>{index + 1}</span>
                                <img src={leagueNameToImage[player.league]} alt={player.league.name} className="w-24 h-24 mx-auto my-4" />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{player.name}</h3>
                                <p className="text-blue-600 dark:text-blue-400 font-semibold">{player.donations} Tropas Donadas</p>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default HallOfFamePage;