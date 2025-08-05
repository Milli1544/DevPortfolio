import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Briefcase,
  Users,
  MessageSquare,
  Calendar,
  Mail,
  Phone,
  ExternalLink,
  X,
  Settings,
  BarChart3,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import QualificationForm from "./QualificationForm";
import UserManagement from "./UserManagement";

const AdminDashboard = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showQualificationForm, setShowQualificationForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingQualification, setEditingQualification] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is authenticated and is admin
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }

    if (!isAdmin) {
      navigate("/");
      return;
    }

    console.log("AdminDashboard mounted");
    fetchData();
  }, [isAuthenticated, isAdmin, navigate]);

  const fetchData = async () => {
    try {
      console.log("Fetching data...");
      setLoading(true);

      // Get token from localStorage
      const token = localStorage.getItem("token");

      const [projectsRes, qualificationsRes, contactsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get("http://localhost:5000/api/qualifications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get("http://localhost:5000/api/contacts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      console.log("Projects response:", projectsRes.data);
      console.log("Qualifications response:", qualificationsRes.data);
      console.log("Contacts response:", contactsRes.data);

      setProjects(projectsRes.data.data || []);
      setQualifications(qualificationsRes.data.data || []);
      setContacts(contactsRes.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data");
      setProjects([]);
      setQualifications([]);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`http://localhost:5000/api/projects/${id}`, config);
      setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    }
  };

  const handleDeleteQualification = async (id) => {
    if (!window.confirm("Are you sure you want to delete this qualification?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `http://localhost:5000/api/qualifications/${id}`,
        config
      );
      setQualifications(qualifications.filter((qual) => qual._id !== id));
    } catch (error) {
      console.error("Error deleting qualification:", error);
      alert("Failed to delete qualification");
    }
  };

  const handleDeleteContact = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this contact message?")
    )
      return;

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`http://localhost:5000/api/contacts/${id}`, config);
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact message");
    }
  };

  const handleProjectSuccess = () => {
    fetchData();
    setEditingProject(null);
    setShowProjectForm(false);
  };

  const handleQualificationSuccess = () => {
    fetchData();
    setEditingQualification(null);
    setShowQualificationForm(false);
  };

  const openProjectForm = (project = null) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const openQualificationForm = (qualification = null) => {
    setEditingQualification(qualification);
    setShowQualificationForm(true);
  };

  const tabs = [
    {
      id: "projects",
      name: "Projects",
      icon: Briefcase,
      count: projects.length,
      color: "indigo",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      id: "qualifications",
      name: "Qualifications",
      icon: BookOpen,
      count: qualifications.length,
      color: "emerald",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      id: "contacts",
      name: "Contact Messages",
      icon: MessageSquare,
      count: contacts.length,
      color: "rose",
      gradient: "from-rose-500 to-pink-500",
    },
    {
      id: "users",
      name: "Users",
      icon: Users,
      count: 0, // Will be updated when users are fetched
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
    },
  ];

  console.log("AdminDashboard rendering, loading:", loading, "error:", error);

  // Show loading while checking authentication
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-indigo-200 text-lg font-medium">
            Checking authentication...
          </p>
          <p className="text-indigo-300 text-sm mt-2">
            Please wait while we verify your access
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-indigo-200 text-lg font-medium">
            Loading Admin Dashboard...
          </p>
          <p className="text-indigo-300 text-sm mt-2">
            Please wait while we fetch your data
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Error Loading Dashboard
          </h3>
          <p className="text-red-400 mb-6">{error}</p>
          <button
            onClick={fetchData}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      {/* Enhanced Header */}
      <div className="bg-white/5 backdrop-blur-lg border-b border-white/10 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                  Admin Dashboard
                </h1>
                <p className="text-indigo-300 text-sm">
                  Manage your portfolio content and messages
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3 text-right">
                <div>
                  <p className="text-white font-medium text-sm">
                    {user?.name || "Admin"}
                  </p>
                  <p className="text-indigo-300 text-xs">
                    {user?.email || "admin@portfolio.com"}
                  </p>
                </div>
                <div className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Settings className="w-5 h-5 text-indigo-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {tabs.map((tab, index) => (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-300 text-sm font-medium mb-1">
                    {tab.name}
                  </p>
                  <p className="text-4xl font-bold text-white">{tab.count}</p>
                  <p className="text-indigo-400 text-xs mt-1">
                    Total {tab.name.toLowerCase()}
                  </p>
                </div>
                <div
                  className={`p-4 bg-${tab.color}-500/10 rounded-xl group-hover:bg-${tab.color}-500/20 transition-colors`}
                >
                  <tab.icon className={`w-8 h-8 text-${tab.color}-400`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Main Content */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
          {/* Enhanced Tabs */}
          <div className="flex border-b border-white/10 bg-white/5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-all duration-300 relative ${
                  activeTab === tab.id
                    ? `text-${tab.color}-400 bg-${tab.color}-500/5`
                    : "text-indigo-300 hover:text-indigo-200 hover:bg-white/5"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
                <span
                  className={`ml-2 px-2.5 py-0.5 text-xs bg-${tab.color}-500/20 text-${tab.color}-300 rounded-full`}
                >
                  {tab.count}
                </span>
                {activeTab === tab.id && (
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${tab.gradient}`}
                  ></div>
                )}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            {/* Projects Tab */}
            {activeTab === "projects" && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      Projects
                    </h3>
                    <p className="text-indigo-300 text-sm">
                      Manage your portfolio projects
                    </p>
                  </div>
                  <button
                    onClick={() => openProjectForm()}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 transition-all duration-300 font-medium shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    Add Project
                  </button>
                </div>

                {projects.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Briefcase className="w-10 h-10 text-indigo-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-3">
                      No Projects Yet
                    </h4>
                    <p className="text-indigo-300 mb-8 max-w-md mx-auto">
                      Start by adding your first project to showcase your work
                      and skills to potential clients or employers.
                    </p>
                    <button
                      onClick={() => openProjectForm()}
                      className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition-all duration-300 font-medium shadow-lg"
                    >
                      Add Your First Project
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {projects.map((project) => (
                      <motion.div
                        key={project._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors">
                            {project.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openProjectForm(project)}
                              className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project._id)}
                              className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-indigo-200 text-sm mb-4 line-clamp-3">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 text-xs rounded-full">
                            {project.category || "Web Development"}
                          </span>
                        </div>
                        <p className="text-indigo-300 text-xs mb-4">
                          <span className="font-medium">Technologies:</span>{" "}
                          {project.technologies}
                        </p>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View on GitHub
                          </a>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Qualifications Tab */}
            {activeTab === "qualifications" && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      Qualifications
                    </h3>
                    <p className="text-indigo-300 text-sm">
                      Manage your educational background
                    </p>
                  </div>
                  <button
                    onClick={() => openQualificationForm()}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90 transition-all duration-300 font-medium shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    Add Qualification
                  </button>
                </div>

                {qualifications.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-3">
                      No Qualifications Yet
                    </h4>
                    <p className="text-indigo-300 mb-8 max-w-md mx-auto">
                      Add your educational background and certifications to
                      showcase your expertise and qualifications.
                    </p>
                    <button
                      onClick={() => openQualificationForm()}
                      className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:opacity-90 transition-all duration-300 font-medium shadow-lg"
                    >
                      Add Your First Qualification
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {qualifications.map((qualification) => (
                      <motion.div
                        key={qualification._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                              <h4 className="text-xl font-semibold text-white">
                                {qualification.degree}
                              </h4>
                              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-300 text-xs rounded-full">
                                {qualification.field}
                              </span>
                            </div>
                            <p className="text-indigo-300 mb-2 font-medium">
                              {qualification.institution}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-indigo-300 mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {qualification.startDate} -{" "}
                                {qualification.endDate || "Present"}
                              </span>
                              {qualification.grade && (
                                <span className="text-emerald-400 font-medium">
                                  Grade: {qualification.grade}
                                </span>
                              )}
                            </div>
                            {qualification.description && (
                              <p className="text-indigo-200 text-sm">
                                {qualification.description}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 ml-6">
                            <button
                              onClick={() =>
                                openQualificationForm(qualification)
                              }
                              className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteQualification(qualification._id)
                              }
                              className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === "contacts" && (
              <div>
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Contact Messages
                  </h3>
                  <p className="text-indigo-300 text-sm">
                    View and manage contact form submissions
                  </p>
                </div>

                {contacts.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MessageSquare className="w-10 h-10 text-rose-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-3">
                      No Messages Yet
                    </h4>
                    <p className="text-indigo-300 max-w-md mx-auto">
                      Contact messages from your portfolio will appear here when
                      visitors reach out to you.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {contacts.map((contact) => (
                      <motion.div
                        key={contact._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center">
                              <Mail className="w-6 h-6 text-rose-400" />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-white">
                                {contact.name}
                              </h4>
                              <div className="flex items-center gap-4 text-sm text-indigo-300">
                                <span className="flex items-center gap-1">
                                  <Mail className="w-4 h-4" />
                                  {contact.email}
                                </span>
                                {contact.phone && (
                                  <span className="flex items-center gap-1">
                                    <Phone className="w-4 h-4" />
                                    {contact.phone}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-indigo-400">
                              {new Date(contact.createdAt).toLocaleDateString()}
                            </span>
                            <button
                              onClick={() => handleDeleteContact(contact._id)}
                              className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4">
                          <p className="text-indigo-200 leading-relaxed">
                            {contact.message}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && <UserManagement />}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showProjectForm && (
        <ProjectForm
          project={editingProject}
          onClose={() => {
            setShowProjectForm(false);
            setEditingProject(null);
          }}
          onSuccess={handleProjectSuccess}
        />
      )}

      {showQualificationForm && (
        <QualificationForm
          qualification={editingQualification}
          onClose={() => {
            setShowQualificationForm(false);
            setEditingQualification(null);
          }}
          onSuccess={handleQualificationSuccess}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
