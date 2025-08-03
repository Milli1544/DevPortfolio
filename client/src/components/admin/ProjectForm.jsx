import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Plus, Edit, AlertCircle } from "lucide-react";
import axios from "axios";

const ProjectForm = ({ project = null, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    imageUrl: "",
    githubUrl: "",
    liveUrl: "",
    category: "web",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        technologies: project.technologies || "",
        imageUrl: project.imageUrl || "",
        githubUrl: project.githubUrl || "",
        liveUrl: project.liveUrl || "",
        category: project.category || "web",
      });
    }
  }, [project]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.technologies.trim()) {
      newErrors.technologies = "Technologies are required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
    if (submitError) {
      setSubmitError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const url = project
        ? `http://localhost:5000/api/projects/${project._id}`
        : "http://localhost:5000/api/projects";

      const method = project ? "put" : "post";

      // Get token from localStorage
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios[method](url, formData, config);

      if (response.data.success) {
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Error saving project:", error);
      setSubmitError(error.response?.data?.message || "Failed to save project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 text-transparent bg-clip-text">
            {project ? "Edit Project" : "Add New Project"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-indigo-200" />
          </button>
        </div>

        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span className="text-red-400 text-sm">{submitError}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium mb-2 text-indigo-200"
              >
                Project Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border transition-colors text-indigo-100 placeholder-indigo-300/50 ${
                  errors.title
                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                    : "border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50"
                }`}
                placeholder="Enter project title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-400">{errors.title}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium mb-2 text-indigo-200"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 transition-colors text-indigo-100"
              >
                <option value="web">Web Development</option>
                <option value="mobile">Mobile Development</option>
                <option value="desktop">Desktop Application</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2 text-indigo-200"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border transition-colors text-indigo-100 placeholder-indigo-300/50 ${
                errors.description
                  ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                  : "border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50"
              }`}
              placeholder="Enter project description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-400">{errors.description}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="technologies"
              className="block text-sm font-medium mb-2 text-indigo-200"
            >
              Technologies *
            </label>
            <input
              type="text"
              id="technologies"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border transition-colors text-indigo-100 placeholder-indigo-300/50 ${
                errors.technologies
                  ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                  : "border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50"
              }`}
              placeholder="e.g., React, Node.js, MongoDB"
            />
            {errors.technologies && (
              <p className="mt-1 text-sm text-red-400">{errors.technologies}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium mb-2 text-indigo-200"
              >
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 transition-colors text-indigo-100 placeholder-indigo-300/50"
                placeholder="/images/project.jpg or https://example.com/image.jpg"
              />
            </div>

            <div>
              <label
                htmlFor="githubUrl"
                className="block text-sm font-medium mb-2 text-indigo-200"
              >
                GitHub URL
              </label>
              <input
                type="text"
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 transition-colors text-indigo-100 placeholder-indigo-300/50"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="liveUrl"
              className="block text-sm font-medium mb-2 text-indigo-200"
            >
              Live Demo URL
            </label>
            <input
              type="text"
              id="liveUrl"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 transition-colors text-indigo-100 placeholder-indigo-300/50"
              placeholder="https://example.com"
            />
          </div>

          <div className="flex items-center justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-indigo-200 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-400 to-violet-400 text-white hover:opacity-90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  {project ? (
                    <Edit className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  {project ? "Update Project" : "Add Project"}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ProjectForm;
