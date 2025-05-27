export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, userName }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full border border-gray-700 shadow-2xl">
                <h2 className="text-xl font-bold mb-4 text-gray-100">
                    Confirmar Eliminación
                </h2>
                <p className="text-gray-300 mb-6">
                    ¿Estás seguro que deseas eliminar al usuario{" "}
                    <span className="font-semibold">{userName}</span>?
                </p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-600 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded transition duration-150"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-150"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
} 