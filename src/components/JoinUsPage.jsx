import { CheckCircle, Clipboard } from "lucide-react";
import { useState } from "react";

const JoinUsPage = ({ clanTag }) => {
    const [copyText, setCopyText] = useState('Copiar');

    const handleCopy = () => {
        if (!clanTag) return;
        const decodedTag = clanTag.replace('%23', '#');
        const textArea = document.createElement('textarea');
        textArea.value = decodedTag;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        setCopyText('¡Copiado!');
        setTimeout(() => setCopyText('Copiar'), 2000);
    };

    return (
        <div className="animate-fade-in">
            <div>
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Centro de Reclutamiento</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-12">¿Listo para unirte a la élite? Sigue estos pasos para aplicar.</p>
            </div>

            <div className="bg-white dark:bg-gray-950 p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Paso 1: Copia Nuestro Tag de Clan</h2>
                <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4">
                    <span className="font-mono text-lg text-blue-600 dark:text-blue-400">{clanTag ? clanTag.replace('%23', '#') : 'Cargando...'}</span>
                    <button onClick={handleCopy} className="bg-black text-white font-semibold py-2 px-4 hover:bg-gray-800 transition-colors flex items-center gap-2">
                        <Clipboard size={16} />
                        {copyText}
                    </button>
                </div>
            </div>

            <div className="mt-8 bg-white dark:bg-gray-950 p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Paso 2: Cumple los Requisitos</h2>
                <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-gray-700 dark:text-gray-300">Ayuntamiento Nivel 15+</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-gray-700 dark:text-gray-300">Héroes Nivel 80+</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-gray-700 dark:text-gray-300">Actividad en Guerras y Ligas de Guerra</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-gray-700 dark:text-gray-300">Uso obligatorio de Discord</span>
                    </li>
                </ul>
            </div>

            <div className="mt-8 bg-white dark:bg-gray-950 p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Paso 3: ¡Envía tu Solicitud!</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Busca nuestro tag en Clash of Clans y envía tu solicitud. ¡Te esperamos en el campo de batalla!</p>
                <a href="#" className="inline-block bg-indigo-600 text-white font-bold py-4 px-10 hover:bg-indigo-700 transition-colors text-lg shadow-lg">
                    Únete a Nuestro Discord
                </a>
            </div>

        </div>
    );
};
export default JoinUsPage;