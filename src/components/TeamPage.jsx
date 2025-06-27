import { useEffect } from "react";
import { leagueNameToImage } from "../utils/leagueMap";

const TeamPage = ({ selectedPlayer,clanInfo, onPlayerClick }) => {
    const roleOrder = { leader: 1, coLeader: 2, admin: 3, member: 4 };
    const sortedMembers = [...(clanInfo?.memberList || [])].sort((a, b) => (roleOrder[a.role] || 5) - (roleOrder[b.role] || 5));
    useEffect(()=>{
        if (selectedPlayer) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        }
    },[selectedPlayer])
    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Nuestro Equipo</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Los arquitectos de la victoria. Haz clic en un jugador para ver sus detalles.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {sortedMembers.map(member => (
                     
                    <div  key={member.tag}  className="bg-white dark:bg-gray-950 p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:bg-gray-800 transition-all cursor-pointer">
                        <img src={leagueNameToImage[member.league]} alt={member.league} className="w-32 h-32 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{member.name}</h2>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">{({ leader: 'Líder', coLeader: 'Co-líder', admin: 'Veterano', member: 'Miembro' })[member.role] || member.role}</p>
                        <div className="flex justify-center gap-6 text-gray-700 dark:text-gray-300">
                            <span>TH: {member.townhall}</span>
                            <span>Trofeos: {member.trophies}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamPage;