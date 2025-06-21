export default function winnerCalculator(clan,opponent){
    if(clan.stars === opponent.stars){
        if(clan.destructionPercentage === opponent.destructionPercentage) return {text:'Empate',color:'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'};
        if(clan.destructionPercentage > opponent.destructionPercentage) return {text:'Victoria', color:'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'};
    }
    if (clan.stars > opponent.stars) return {text:'Victoria',color:'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'};
    return {text:'Derrota',color:'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'};

}