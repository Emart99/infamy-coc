export function calculateWarHallOfFame(warLog, minAttacks = 4) {
    const playerStats = new Map();
    for (const war of warLog) {
        if (!war || !war.clan || !war.clan.members) {
            continue; 
        }

        const myClan = war.clan.name === "iNFAMY" ? war.clan : war.opponent;

        for (const member of myClan.members) {
            if (!member.attacks || member.attacks.length === 0) {
                continue;
            }
            const stats = playerStats.get(member.tag) || {
                tag: member.tag,
                name: member.name,
                totalStars: 0,
                totalAttacks: 0,
                threeStarAttacks: 0,
            };

            stats.name = member.name; 

            for (const attack of member.attacks) {
                stats.totalStars += attack.stars;
                if (attack.stars === 3) {
                    stats.threeStarAttacks++;
                }
            }
            stats.totalAttacks += member.attacks.length;

            playerStats.set(member.tag, stats);
        }
    }

    const rankedPlayers = Array.from(playerStats.values())
        .filter(player => player.totalAttacks >= minAttacks) // Filtrar jugadores con pocos ataques
        .map(player => ({
            ...player,
            averageStars: parseFloat((player.totalStars / player.totalAttacks).toFixed(2)),
        }));

    rankedPlayers.sort((a, b) => {
        if (b.totalStars !== a.totalStars) {
            return b.totalStars - a.totalStars; // Criterio principal
        }
        return b.averageStars - a.averageStars; // Criterio de desempate
    });

    return rankedPlayers;
}


export function calculateWorstAttackers(warLog, minAttacks = 4) {
    const playerStats = new Map();

    for (const war of warLog) {
        if (!war || !war.clan || !war.clan.members) {
            continue;
        }
        const myClan = war.clan.name === "iNFAMY" ? war.clan : war.opponent;
        for (const member of myClan.members) {
            if (!member.attacks || member.attacks.length === 0) {
                continue;
            }
            const stats = playerStats.get(member.tag) || {
                tag: member.tag,
                name: member.name,
                totalStars: 0,
                totalAttacks: 0,
                threeStarAttacks: 0,
            };
            stats.name = member.name;
            for (const attack of member.attacks) {
                stats.totalStars += attack.stars;
                if (attack.stars === 3) {
                    stats.threeStarAttacks++;
                }
            }
            stats.totalAttacks += member.attacks.length;
            playerStats.set(member.tag, stats);
        }
    }

    const rankedPlayers = Array.from(playerStats.values())
        .filter(player => player.totalAttacks >= minAttacks)
        .map(player => ({
            ...player,
            averageStars: parseFloat((player.totalStars / player.totalAttacks).toFixed(2)),
        }));

    rankedPlayers.sort((a, b) => {
        if (a.averageStars !== b.averageStars) {
            return a.averageStars - b.averageStars;
        }
        return a.totalStars - b.totalStars; 
    });

    return rankedPlayers;
}