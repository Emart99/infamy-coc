import { ArrowLeft, Star } from "lucide-react";
import winnerCalculator from "../utils/winnerCalculator";

const WarDetailPage = ({ war, onBack }) => {
    if (!war) return null;
    const opponent = war.clan.name!="iNFAMY"? war.clan : war.opponent
    const myClan = war.clan.name=="iNFAMY"? war.clan : war.opponent
    const result = winnerCalculator(myClan,opponent)
    const Attack = ({ attack, attackerName, defenderName }) => {
        if (!attack) return null; 

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
                    <div className={`bg-gray-100 dark:bg-gray-800 p-4 ${result.color}`}>
                        <div className={`text-4xl font-bold `}>{result.text}</div>
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
export default WarDetailPage;