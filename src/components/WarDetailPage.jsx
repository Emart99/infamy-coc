import { useState } from 'react';
import { LoaderCircle, PlusCircle, MinusCircle, Star } from 'lucide-react';

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
        <div className="p-2 border-b border-gray-300 dark:border-gray-600 cursor-pointer" onClick={() => setIsExpanded(prev => !prev)} >
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <span className="mr-4 text-lg font-bold">{player.mapPosition}</span>
                    <div>
                        <p className="font-semibold text-black dark:text-white">{player.name}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-200">TH {player.townhallLevel}</p>
                    </div>
                </div>
                <button onClick={() => setIsExpanded(!isExpanded)} className="focus:outline-none cursor-pointer">
                    {isExpanded ? (
                        <MinusCircle className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    ) : (
                        <PlusCircle className="w-5 h-5 text-gray-600 dark:text-gray-300" />
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

const WarDetailPage = ({ war }) => {
    if (!war) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoaderCircle className="w-12 h-12 text-gray-800 dark:text-gray-200 animate-spin" />
            </div>
        );
    }

    const sortedClanMembers = [...war.clan.members].sort((a, b) => a.mapPosition - b.mapPosition);
    const sortedOpponentMembers = [...war.opponent.members].sort((a, b) => a.mapPosition - b.mapPosition);
    console.log()
    return (
        <div className="p-4 md:p-8 bg-gray-200 rounded-sm dark:bg-gray-950 dark:border-gray-600 border-gray-300 border dark:text-gray-200 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <div className="flex justify-center gap-2">
                        <img src={war.clan.badgeUrls.small} className="h-10 w-10" />
                        <h1 className="text-4xl font-bold dark:text-white text-center pb-6">{war.clan.name}</h1>
                    </div>

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
                    <div className="flex justify-center gap-2">
                        <img src={war.opponent.badgeUrls.small} className="h-10 w-10" />
                        <h1 className="text-4xl font-bold dark:text-white text-center pb-6">{war.opponent.name}</h1>
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