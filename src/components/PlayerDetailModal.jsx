import { LoaderCircle, X } from "lucide-react";

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
                            <img src={displayPlayer.league.iconUrls} alt={displayPlayer.league.name} className="w-40 h-40 " />
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
export default PlayerDetailModal;