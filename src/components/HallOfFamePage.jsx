import { leagueNameToImage } from "../utils/leagueMap";

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
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Top 3 - Donaciones</h2>
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

export default HallOfFamePage;