const AlertTypes = {
    SUCCESS: "success",
    ERROR: "error",
};

export default function Alert({ type, message, onClose }) {
    if (!message) return null;

    const alertStyles = {
        [AlertTypes.SUCCESS]: {
            container: "bg-green-600",
            icon: "✓",
        },
        [AlertTypes.ERROR]: {
            container: "bg-red-600",
            icon: "✕",
        },
    };

    const { container, icon } = alertStyles[type] || alertStyles[AlertTypes.ERROR];

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
            <div
                className={`${container} text-white px-6 py-4 rounded-lg shadow-lg flex items-center justify-between min-w-[300px]`}
            >
                <div className="flex items-center">
                    <span className="mr-2 font-bold">{icon}</span>
                    <p>{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="ml-4 text-white hover:text-gray-200 transition-colors"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}

export { AlertTypes }; 