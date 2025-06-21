import { AlertTriangle } from "lucide-react";

const ErrorMessage = ({ message }) => (
    <div className="flex flex-col items-center justify-center text-center bg-red-100 border border-red-200 p-6 my-8 dark:bg-red-900/20 dark:border-red-500/30">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-red-700 dark:text-red-400">Ocurrió un Error al Cargar los Datos</h3>
        <p className="text-red-600 dark:text-red-300 mt-2">{message}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            Asegúrate de que la Netlify Function esté desplegada y funcionando correctamente.
        </p>
    </div>
);

export default ErrorMessage;