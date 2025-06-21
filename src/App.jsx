import { useState, useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import HomePage from './components/HomePage';
import TeamPage from './components/TeamPage';
import SchedulePage from './components/SchedulePage';
import WarDetailPage from './components/WarDetailPage';
import JoinUsPage from './components/JoinUsPage';
import HallOfFamePage from "./components/HallOfFamePage"
import PlayerDetailModal from "./components/PlayerDetailModal"
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

export default function App() {
    const [page, setPage] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedWar, setSelectedWar] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [detailedPlayer, setDetailedPlayer] = useState(null);
    const [isModalLoading, setIsModalLoading] = useState(false);
    

    const [clanInfo, setClanInfo] = useState(null);
    const [warLog, setWarLog] = useState([]);
    const [currentWar, setCurrentWar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClanData = async () => {
            setLoading(true);
            setError(null);
            const CLASH_API_URL = `/.netlify/functions/clash-api`;
            const CURRENT_WAR_URL = `/.netlify/functions/get-current-war`;
            try {
                const [clanResponse, currentWarResponse] = await Promise.all([
                    fetch(CLASH_API_URL),
                    fetch(CURRENT_WAR_URL)
                ]);
                
                if (!clanResponse.ok) {
                    const errorData = await clanResponse.json();
                    throw new Error(errorData.message || `Error del servidor: ${clanResponse.status}`);
                }
                const clanData = await clanResponse.json();
                setClanInfo(clanData.clanInfo);
                setWarLog(clanData.warLog.items.filter(war => war.result != null));
                if (currentWarResponse.ok) {
                    const currentWarData = await currentWarResponse.json();
                    setCurrentWar(currentWarData);
                } else {
                    console.warn('No hay guerra en curso o no se pudo cargar.')
                }
            } catch (err) {
                console.error("Error fetching data from Netlify Function:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchClanData();
    }, []);

    const handleWarClick = (war) => {
        setSelectedWar(war);
        setPage('warDetail');
    };

    const handleBackToSchedule = () => {
        setSelectedWar(null);
        setPage('schedule');
    };

    const handlePlayerClick = async (player) => {
        setSelectedPlayer(player);
        setIsModalLoading(true);
        setDetailedPlayer(null);

        const playerTag = player.tag.replace('#', '%23');
        const NETLIFY_FUNCTION_URL = `/.netlify/functions/get-player-details?tag=${playerTag}`;

        try {
            const response = await fetch(NETLIFY_FUNCTION_URL);
            if (!response.ok) {
                throw new Error('No se pudo cargar la información detallada del jugador.');
            }
            const data = await response.json();
            setDetailedPlayer(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsModalLoading(false);
        }
    }

    const handleCloseModal = () => {
        setSelectedPlayer(null);
        setDetailedPlayer(null);
    }

    const renderPage = () => {
        if (loading) return <LoadingSpinner />;
        if (error) return <ErrorMessage message={error} />;

        switch (page) {
            case 'team':
                return <TeamPage selectedPlayer={selectedPlayer} clanInfo={clanInfo} onPlayerClick={handlePlayerClick} />;
            case 'schedule':
                return <SchedulePage warLog={warLog} currentWar={currentWar} onWarClick={handleWarClick} />;
            case 'warDetail':
                return <WarDetailPage war={selectedWar} onBack={handleBackToSchedule} />;
            case 'hallOfFame':
                return <HallOfFamePage clanInfo={clanInfo} onPlayerClick={handlePlayerClick} />;
            case 'join':
                return <JoinUsPage clanTag={clanInfo?.tag} />;
            case 'home':
            default:
                return <HomePage setPage={setPage} />;
        }
    };

    return (
        <div className="min-h-screen font-sans bg-gray-50 text-gray-800 dark:bg-black dark:text-gray-200 transition-colors duration-300">
            <Navbar clanInfo={clanInfo} setPage={setPage} page={page} isMenuOpen={isMenuOpen} />
            <div className={`transition-filter duration-300 ${selectedPlayer ? 'blur-sm' : ''}`}>
                <main className="container mx-auto px-4 py-8">
                    {renderPage()}
                </main>
                
            </div>

            <PlayerDetailModal player={selectedPlayer} detailedPlayer={detailedPlayer} isLoading={isModalLoading} onClose={handleCloseModal} />
            <Footer/>
        </div>
    );
}