"use client";

import { useState } from "react";

const REQUIRED_FIELDS = {
    name: {
        label: "nombre",
        validate: (value) => value.trim().length >= 3,
    },
    email: {
        label: "email",
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    },
    edad: {
        label: "edad",
        validate: (value) => !isNaN(value) && value >= 0 && value <= 100,
    },
};

export default function CreateEditModal({
    isOpen,
    onClose,
    onSubmit,
    editingUser,
    formData,
    setFormData,
}) {
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        edad: "",
    });

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        Object.entries(REQUIRED_FIELDS).forEach(([field, { label, validate }]) => {
            if (!formData[field]) {
                newErrors[field] = `El ${label} es requerido`;
                isValid = false;
            } else if (!validate(formData[field])) {
                newErrors[field] = `El ${label} no es válido`;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(e);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full border border-gray-700 shadow-2xl">
                <h2 className="text-xl font-bold mb-4 text-gray-100">
                    {editingUser ? "Editar Usuario" : "Nuevo Usuario"}
                </h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2">
                            Nombre
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value });
                                if (errors.name) {
                                    setErrors({ ...errors, name: "" });
                                }
                            }}
                            className={`bg-gray-700 shadow appearance-none border ${errors.name ? "border-red-500" : "border-gray-600"
                                } rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-150`}
                            required
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value });
                                if (errors.email) {
                                    setErrors({ ...errors, email: "" });
                                }
                            }}
                            className={`bg-gray-700 shadow appearance-none border ${errors.email ? "border-red-500" : "border-gray-600"
                                } rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-150`}
                            required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2">
                            Edad
                        </label>
                        <input
                            type="number"
                            value={formData.edad}
                            onChange={(e) => {
                                setFormData({ ...formData, edad: e.target.value });
                                if (errors.edad) {
                                    setErrors({ ...errors, edad: "" });
                                }
                            }}
                            className={`bg-gray-700 shadow appearance-none border ${errors.edad ? "border-red-500" : "border-gray-600"
                                } rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-150`}
                            min="18"
                            max="100"
                            required
                        />
                        {errors.edad && (
                            <p className="text-red-500 text-xs italic mt-1">{errors.edad}</p>
                        )}
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-600 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded transition duration-150"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition duration-150"
                        >
                            {editingUser ? "Guardar Cambios" : "Crear Usuario"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 