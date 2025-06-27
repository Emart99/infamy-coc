import { Star } from "lucide-react";
import winnerCalculator from "../utils/winnerCalculator";

const SchedulePage = ({ warLog, currentWar, onWarClick }) => {
    
    return (
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
                        const opponent = war.clan.name != "iNFAMY" ? war.clan : war.opponent
                        const myClan = war.clan.name == "iNFAMY" ? war.clan : war.opponent
                        const resultStyle = winnerCalculator(myClan, opponent)
                        return (
                            <li key={index} onClick={() => onWarClick(war)} className="cursor-pointer p-4 md:p-6 grid grid-cols-2 md:grid-cols-3 items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <img src={opponent.badgeUrls.small} alt="escudo oponente" className="w-10 h-10" />
                                    <div>
                                        <span className="font-bold text-gray-900 dark:text-white text-lg">{opponent.name}</span>
                                        <span className="block text-gray-500 dark:text-gray-400 text-sm">Fin: {(iso => iso ? new Date(`${iso.substring(0, 4)}-${iso.substring(4, 6)}-${iso.substring(6, 8)}`).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : '')(war.endTime)}</span>
                                    </div>
                                </div>
                                <div className="text-right md:text-center">
                                    <span className={`px-4 py-1 rounded-full text-sm font-bold ${resultStyle.color}`}>{resultStyle.text}</span>
                                </div>
                                <div className="col-span-2 md:col-span-1 text-right text-lg font-bold text-gray-900 dark:text-white">
                                    <span>{myClan.stars} <span className="text-yellow-500">★</span></span>
                                    <span className="mx-2 text-gray-400">-</span>
                                    <span>{opponent.stars} <span className="text-yellow-500">★</span></span>
                                </div>
                            </li>
                        )
                    }
                    )}
                </ul>
            </div>
        </div>
    )
}



export default SchedulePage;