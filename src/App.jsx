import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

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
    const [selectedWar, setSelectedWar] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [detailedPlayer, setDetailedPlayer] = useState(null);
    const [isModalLoading, setIsModalLoading] = useState(false);

    const navigate = useNavigate();

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
                setWarLog(clanData.warLog);
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

    const handleWarClick = (war, isCurrentWar = false) => {
        const warId = isCurrentWar ? 'current' : war.endTime;
        navigate(`/schedule/war-detail/${warId}`);
     };


    const handleBackToSchedule = () => {
        setSelectedWar(null);
        navigate('/schedule');
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

    return (
        <div className="min-h-screen font-sans bg-gray-50 text-gray-800 dark:bg-black dark:text-gray-200 transition-colors duration-300">
            <Navbar clanInfo={clanInfo} />
            <div className={`transition-filter duration-300 ${selectedPlayer ? 'blur-sm' : ''}`}>
                <main className="container mx-auto px-4 py-8">
                    {loading && <LoadingSpinner />}
                    {error && <ErrorMessage message={error} />}
                    {!loading && !error && (
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/team" element={<TeamPage clanInfo={clanInfo} onPlayerClick={handlePlayerClick} />} />
                            <Route path="/schedule" element={<SchedulePage warLog={warLog} currentWar={currentWar} onWarClick={(war) => handleWarClick(war)} onCurrentWarClick={(war) => handleWarClick(war, true)} />} />
                            <Route path="/schedule/war-detail/:warId" element={<WarDetailPage warLog={warLog} currentWar={currentWar} onBack={handleBackToSchedule} />} />
                            <Route path="/hall-of-fame" element={<HallOfFamePage clanInfo={clanInfo} warLog={warLog} onPlayerClick={handlePlayerClick} />} />
                            <Route path="/join" element={<JoinUsPage clanTag={clanInfo?.tag} />} />
                        </Routes>
                    )}
                </main>
            </div>
            <PlayerDetailModal player={selectedPlayer} detailedPlayer={detailedPlayer} isLoading={isModalLoading} onClose={handleCloseModal} />
            <Footer />
        </div>
    );
}