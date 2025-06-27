import { useState } from 'react';
import { LoaderCircle, Star, Plus, Minus } from 'lucide-react';
import { useParams } from 'react-router';
import winnerCalculator from "../utils/winnerCalculator";


const AttackColumn = ({ title, attack, opponentMembers }) => {
    if (!attack) {
        return (
            <div>
                <h3 className="font-bold text-md text-center">{title}</h3>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">Not used</p>
            </div>
        );
    }

    const defender = opponentMembers.find(member => member.tag === attack.defenderTag);

    const renderStars = (starCount) => {
        const stars = [];
        for (let i = 0; i < 3 - starCount; i++) {
            stars.push(<Star key={`gray-${i}`} className="w-5 h-5 text-gray-500" />);
        }
        for (let i = 0; i < starCount; i++) {
            stars.push(<Star key={`yellow-${i}`} className="w-5 h-5 text-yellow-400 fill-current" />);
        }
        return <div className="flex justify-center space-x-1">{stars}</div>;
    };

    return (
        <div className="text-center">
            <h3 className="font-bold text-md">{title}</h3>
            {defender && (
                <p className="text-sm mt-2">
                    <span className="font-bold">{defender.mapPosition}</span>. {defender.name}
                </p>
            )}
            <div className="mt-1 flex justify-center items-center gap-2">
                {renderStars(attack.stars)}
                <p className="text-sm font-semibold">{attack.destructionPercentage}%</p>

            </div>
        </div>
    );
};

const PlayerCard = ({ player, attacks, opponentMembers }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="p-2 border-b border-gray-300 dark:border-gray-600 ">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <span className="mr-4 text-lg font-bold">{player.mapPosition}</span>
                    <div>
                        <p className="font-semibold text-black dark:text-white">{player.name}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-200">TH {player.townhallLevel}</p>
                    </div>
                </div>
                <button onClick={() => setIsExpanded(prev => !prev)} className="focus:outline-none cursor-pointer">
                    {isExpanded ? (
                        <Minus className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    ) : (
                        <Plus className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    )}
                </button>
            </div>
            {isExpanded && (
                <div className="dark:bg-gray-950 bg-gray-200 p-4 rounded-md mt-2">
                    {attacks?.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                            <AttackColumn title="Ataque 1" attack={attacks[0]} opponentMembers={opponentMembers} />
                            <AttackColumn title="Ataque 2" attack={attacks[1]} opponentMembers={opponentMembers} />
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">No realizo ataques.</p>
                    )}
                </div>
            )}
        </div>
    );
};

const WarDetailPage = ({ warLog, currentWar }) => {
    const { warId } = useParams();

    let war = null;
    if (warId === 'current') {
        war = currentWar;
    } else {
        war = warLog.find(w => w.endTime === warId);
    }
    if (!war) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoaderCircle className="w-12 h-12 text-gray-800 dark:text-gray-200 animate-spin" />
            </div>
        );
    }
    const opponent = war.clan.name != "iNFAMY" ? war.clan : war.opponent
    const myClan = war.clan.name == "iNFAMY" ? war.clan : war.opponent
    const result = winnerCalculator(myClan, opponent)
    const resultEnemy = (text) =>{
        if(text == "Victoria"){
            return {text:'Derrota',color:'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}
        }
        else if(text=="Derrota"){
            return {text:'Victoria', color:'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'}
        }
        return{text:'Empate',color:'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'};
    }
    
    const sortedClanMembers = [...myClan.members].sort((a, b) => a.mapPosition - b.mapPosition);
    const sortedOpponentMembers = [...opponent.members].sort((a, b) => a.mapPosition - b.mapPosition);
    console.log()
    return (
        <div className="p-4 md:p-8 bg-gray-200 dark:bg-gray-950 dark:border-gray-600 border-gray-300 border dark:text-gray-200 min-h-screen">
            <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full gap-2 md:gap-8 mb-6">
                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                        <h1 className="text-lg md:text-4xl font-bold dark:text-white truncate">{myClan.name}</h1>
                        <img src={myClan.badgeUrls.small} className="h-6 w-6 md:h-10 md:w-10 flex-shrink-0" alt="Badge mi clan" />
                    </div>
                    <div className="text-lg md:text-2xl lg:text-4xl font-bold text-yellow-500 flex items-center gap-1 md:gap-2">
                        {myClan.stars}
                        <Star className="fill-current w-4 h-4 md:w-6 md:h-6" />
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-1 hidden md:block">
                        Estrellas (Nuestro Clan)
                    </div>
                </div>

                <div className={`bg-gray-100 dark:bg-gray-800 rounded-lg p-2 md:p-6 justify-self-end md:justify-self-center  ${result.color}`}>
                    <div className="text-lg md:text-2xl lg:text-4xl font-bold text-center">{result.text}</div>
                </div>

                <div className="flex flex-col items-end justify-self-end hidden md:flex ">
                    <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                        <img src={opponent.badgeUrls.small} className="h-6 w-6 md:h-10 md:w-10 flex-shrink-0" alt="Badge clan enemigo" />
                        <h1 className="text-lg md:text-2xl lg:text-4xl font-bold dark:text-white truncate">{opponent.name}</h1>
                    </div>
                    <div className="text-lg md:text-4xl font-bold text-yellow-500 flex items-center gap-1 md:gap-2">
                        {opponent.stars}
                        <Star className="fill-current w-4 h-4 md:w-6 md:h-6" />
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-1 text-right hidden md:block">
                        Estrellas (Clan Enemigo)
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <div className="bg-gray-100 dark:bg-gray-900 p-4">
                        {sortedClanMembers.map(player => (
                            <PlayerCard
                                key={player.tag}
                                player={player}
                                attacks={player.attacks}
                                opponentMembers={sortedOpponentMembers}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-6 md:hidden">
                        <div className="flex flex-col justify-self-start   ">
                            <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                                <img src={opponent.badgeUrls.small} className="h-6 w-6 md:h-10 md:w-10 flex-shrink-0" alt="Badge clan enemigo" />
                                <h1 className="text-lg md:text-4xl font-bold dark:text-white truncate">{opponent.name}</h1>
                            </div>
                            <div className="text-lg md:text-4xl font-bold text-yellow-500 flex items-center gap-1 md:gap-2">
                                {opponent.stars}
                                <Star className="fill-current w-4 h-4 md:w-6 md:h-6" />
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-1 text-right hidden md:block">
                                Estrellas (Clan Enemigo)
                            </div>
                        </div>
                        <div className={`bg-gray-100 dark:bg-gray-800 rounded-lg p-2 md:p-6 justify-self-end md:justify-self-center  ${resultEnemy(result.text).color}`}>
                            <div className="text-lg md:text-2xl lg:text-4xl font-bold text-center">{resultEnemy(result.text).text}</div>
                        </div>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-900 p-4">
                        {sortedOpponentMembers.map(player => (
                            <PlayerCard
                                key={player.tag}
                                player={player}
                                attacks={player.attacks}
                                opponentMembers={sortedClanMembers}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WarDetailPage;