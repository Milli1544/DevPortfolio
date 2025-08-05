import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Plus, Edit, AlertCircle } from "lucide-react";
import axios from "axios";

const QualificationForm = ({ qualification = null, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    field: "",
    startDate: "",
    endDate: "",
    description: "",
    grade: "",
    type: "education",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (qualification) {
      setFormData({
        degree: qualification.degree || "",
        institution: qualification.institution || "",
        field: qualification.field || "",
        startDate: qualification.startDate
          ? qualification.startDate.split("T")[0]
          : "",
        endDate: qualification.endDate
          ? qualification.endDate.split("T")[0]
          : "",
        description: qualification.description || "",
        grade: qualification.grade || "",
        type: qualification.type || "education",
      });
    }
  }, [qualification]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.degree.trim()) {
      newErrors.degree = "Degree is required";
    }
    if (!formData.institution.trim()) {
      newErrors.institution = "Institution is required";
    }
    if (!formData.field.trim()) {
      newErrors.field = "Field of study is required";
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
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
      const url = qualification
        ? `http://localhost:5000/api/qualifications/${qualification._id}`
        : "http://localhost:5000/api/qualifications";

      const method = qualification ? "put" : "post";

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
      console.error("Error saving qualification:", error);
      setSubmitError(
        error.response?.data?.message || "Failed to save qualification"
      );
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
            {qualification ? "Edit Qualification" : "Add New Qualification"}
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
                htmlFor="type"
                className="block text-sm font-medium mb-2 text-indigo-200"
              >
                Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 transition-colors text-indigo-100"
              >
                <option value="education">Education</option>
                <option value="certification">Certification</option>
                <option value="experience">Experience</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="degree"
                className="block text-sm font-medium mb-2 text-indigo-200"
              >
                Degree/Certification *
              </label>
              <input
                type="text"
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border transition-colors text-indigo-100 placeholder-indigo-300/50 ${
                  errors.degree
                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                    : "border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50"
                }`}
                placeholder="e.g., Bachelor of Science"
              />
              {errors.degree && (
                <p className="mt-1 text-sm text-red-400">{errors.degree}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="institution"
                className="block text-sm font-medium mb-2 text-indigo-200"
              >
                Institution *
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border transition-colors text-indigo-100 placeholder-indigo-300/50 ${
                  errors.institution
                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                    : "border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50"
                }`}
                placeholder="e.g., University of Toronto"
              />
              {errors.institution && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.institution}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="field"
                className="block text-sm font-medium mb-2 text-indigo-200"
              >
                Field of Study *
              </label>
              <input
                type="text"
                id="field"
                name="field"
                value={formData.field}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border transition-colors text-indigo-100 placeholder-indigo-300/50 ${
                  errors.field
                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                    : "border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50"
                }`}
                placeholder="e.g., Computer Science"
              />
              {errors.field && (
                <p className="mt-1 text-sm text-red-400">{errors.field}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium mb-2 text-indigo-200"
              >
                Start Date *
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border transition-colors text-indigo-100 ${
                  errors.startDate
                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                    : "border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50"
                }`}
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-400">{errors.startDate}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium mb-2 text-indigo-200"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 transition-colors text-indigo-100"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="grade"
              className="block text-sm font-medium mb-2 text-indigo-200"
            >
              Grade/GPA
            </label>
            <input
              type="text"
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 transition-colors text-indigo-100 placeholder-indigo-300/50"
              placeholder="e.g., 3.8 GPA, First Class Honours"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2 text-indigo-200"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-indigo-400/20 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 transition-colors text-indigo-100 placeholder-indigo-300/50"
              placeholder="Additional details about your qualification..."
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
                  {qualification ? (
                    <Edit className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  {qualification ? "Update Qualification" : "Add Qualification"}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default QualificationForm;
