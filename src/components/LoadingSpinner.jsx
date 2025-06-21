import { LoaderCircle } from "lucide-react";

const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-24">
        <LoaderCircle className="w-12 h-12 text-gray-800 dark:text-gray-200 animate-spin" />
    </div>
);
export default LoadingSpinner;