"use client";

import { useState, useEffect } from "react";
import CreateEditModal from "./components/CreateEditModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import Alert, { AlertTypes } from "./components/Alert";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        edad: "",
    });
    const [alert, setAlert] = useState({
        type: null,
        message: "",
    });

    // Fetch users
    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/usuarios");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
            showAlert(AlertTypes.ERROR, "Error al cargar los usuarios");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const showAlert = (type, message) => {
        setAlert({ type, message });
        // Esconde el alert despues de 3 segundos
        setTimeout(() => {
            setAlert({ type: null, message: "" });
        }, 3000);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                await fetchUsers();
                setIsCreateModalOpen(false);
                setFormData({ name: "", email: "", edad: "" });
                showAlert(AlertTypes.SUCCESS, "Usuario creado exitosamente");
            } else {
                showAlert(AlertTypes.ERROR, "Error al crear el usuario");
            }
        } catch (error) {
            console.error("Error creating user:", error);
            showAlert(AlertTypes.ERROR, "Error al crear el usuario");
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/usuarios`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: editingUser.id,
                    ...formData,
                }),
            });
            if (response.ok) {
                await fetchUsers();
                setIsEditModalOpen(false);
                setEditingUser(null);
                setFormData({ name: "", email: "", edad: "" });
                showAlert(AlertTypes.SUCCESS, "Usuario actualizado exitosamente");
            } else {
                showAlert(AlertTypes.ERROR, "Error al actualizar el usuario");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            showAlert(AlertTypes.ERROR, "Error al actualizar el usuario");
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            edad: user.edad,
        });
        setIsEditModalOpen(true);
    };

    const handleCreateClick = () => {
        setFormData({ name: "", email: "", edad: "" });
        setIsCreateModalOpen(true);
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`/api/usuarios?id=${userToDelete.id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                await fetchUsers();
                setIsDeleteModalOpen(false);
                setUserToDelete(null);
                showAlert(AlertTypes.SUCCESS, "Usuario eliminado exitosamente");
            } else {
                showAlert(AlertTypes.ERROR, "Error al eliminar el usuario");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            showAlert(AlertTypes.ERROR, "Error al eliminar el usuario");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-100">
                        Gestión de Usuarios
                    </h1>
                    <button
                        onClick={handleCreateClick}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200"
                    >
                        Nuevo Usuario
                    </button>
                </div>

                {/* Table Container */}
                <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden border border-gray-700">
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full align-middle">
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-700 table-fixed">
                                    <thead className="bg-gray-800">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/4">
                                                Nombre
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/4">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/6">
                                                Edad
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/6">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                                        {users.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="hover:bg-gray-700 transition duration-150"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {user.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {user.edad}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleEditClick(user)}
                                                            className="text-indigo-400 hover:text-indigo-300 transition duration-150"
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteClick(user)}
                                                            className="text-red-400 hover:text-red-300 transition duration-150"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Alert */}
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert({ type: null, message: "" })}
                />

                {/* Modals */}
                <CreateEditModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={handleCreate}
                    editingUser={null}
                    formData={formData}
                    setFormData={setFormData}
                />

                <CreateEditModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setEditingUser(null);
                        setFormData({ name: "", email: "", edad: "" });
                    }}
                    onSubmit={handleEdit}
                    editingUser={editingUser}
                    formData={formData}
                    setFormData={setFormData}
                />

                <DeleteConfirmModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleDeleteConfirm}
                    userName={userToDelete?.name}
                />
            </div>
        </div>
    );
}
