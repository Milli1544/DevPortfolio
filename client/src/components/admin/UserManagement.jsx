import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Edit,
  Trash2,
  Users,
  Mail as MailIcon,
  Calendar,
  Shield,
  User,
  Save,
  X,
  Search,
  Filter,
  Eye,
  EyeOff,
} from "lucide-react";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [editingUser, setEditingUser] = useState(null);
  const [showPassword, setShowPassword] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(API_ENDPOINTS.USERS, config);
      setUsers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    )
      return;

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`${API_ENDPOINTS.USERS}/${userId}`, config);
      setUsers(users.filter((user) => user._id !== userId));
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to delete user";
      alert(errorMessage);
    }
  };

  const handleUpdateUser = async (userId, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${API_ENDPOINTS.USERS}/${userId}`,
        updatedData,
        config
      );

      setUsers(
        users.map((user) => (user._id === userId ? response.data.data : user))
      );
      setEditingUser(null);

      // Show success message
      const message = updatedData.password
        ? "User updated successfully with new password"
        : "User updated successfully";
      console.log(message);
    } catch (error) {
      console.error("Error updating user:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update user";
      alert(errorMessage);
    }
  };

  const startEditing = (user) => {
    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    // Prevent editing own account from admin panel
    if (currentUser._id === user._id) {
      alert(
        "You cannot edit your own account from the admin panel. Please use your profile settings instead."
      );
      return;
    }

    setEditingUser({
      ...user,
      password: "", // Don't show current password
    });
  };

  const cancelEditing = () => {
    setEditingUser(null);
  };

  const saveUser = () => {
    if (!editingUser.name || !editingUser.email) {
      alert("Name and email are required");
      return;
    }

    const updatedData = {
      name: editingUser.name,
      email: editingUser.email,
      role: editingUser.role,
    };

    // Only include password if it's been changed
    if (editingUser.password) {
      updatedData.password = editingUser.password;
    }

    handleUpdateUser(editingUser._id, updatedData);
  };

  const togglePasswordVisibility = (userId) => {
    setShowPassword((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role) => {
    return role === "admin" ? (
      <Shield className="w-4 h-4" />
    ) : (
      <User className="w-4 h-4" />
    );
  };

  const getRoleColor = (role) => {
    return role === "admin"
      ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
      : "bg-blue-500/10 text-blue-300 border-blue-500/20";
  };

  const isCurrentUser = (user) => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    return currentUser._id === user._id;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-200">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <X className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Error Loading Users
        </h3>
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={fetchUsers}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            User Management
          </h3>
          <p className="text-indigo-300 text-sm">
            Manage all registered users and their permissions
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-indigo-300">
          <Users className="w-5 h-5" />
          <span>{users.length} total users</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-indigo-400" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="user">Users</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-indigo-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      No Users Found
                    </h4>
                    <p className="text-indigo-300">
                      {searchTerm || filterRole !== "all"
                        ? "Try adjusting your search or filter criteria"
                        : "No users have registered yet"}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`hover:bg-white/5 transition-colors ${
                      isCurrentUser(user)
                        ? "bg-indigo-500/5 border-l-4 border-indigo-500"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      {editingUser?._id === user._id ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={editingUser.name}
                            onChange={(e) =>
                              setEditingUser({
                                ...editingUser,
                                name: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Name"
                          />
                          <input
                            type="email"
                            value={editingUser.email}
                            onChange={(e) =>
                              setEditingUser({
                                ...editingUser,
                                email: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Email"
                          />
                          <div className="relative">
                            <input
                              type={
                                showPassword[user._id] ? "text" : "password"
                              }
                              value={editingUser.password}
                              onChange={(e) =>
                                setEditingUser({
                                  ...editingUser,
                                  password: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 pr-10 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              placeholder="New password (leave blank to keep current)"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(user._id)}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-400 hover:text-indigo-300"
                            >
                              {showPassword[user._id] ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="text-white font-medium flex items-center gap-2">
                                {user.name}
                                {isCurrentUser(user) && (
                                  <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full">
                                    You
                                  </span>
                                )}
                              </div>
                              <div className="text-indigo-300 text-sm flex items-center gap-1">
                                <MailIcon className="w-3 h-3" />
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingUser?._id === user._id ? (
                        <select
                          value={editingUser.role}
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              role: e.target.value,
                            })
                          }
                          className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(
                            user.role
                          )}`}
                        >
                          {getRoleIcon(user.role)}
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-indigo-300 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-indigo-300 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(user.updatedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {editingUser?._id === user._id ? (
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={saveUser}
                            className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-colors"
                            title="Save changes"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="p-2 rounded-lg bg-gray-500/10 border border-gray-500/20 text-gray-400 hover:bg-gray-500/20 transition-colors"
                            title="Cancel editing"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => startEditing(user)}
                            className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 transition-colors"
                            title="Edit user"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                            title="Delete user"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
