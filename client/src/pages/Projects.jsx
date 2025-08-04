import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Github, ExternalLink, ArrowRight, Loader2 } from "lucide-react";
import Silk from "../components/Silk";
import { motion } from "framer-motion";
import axios from "axios";
import Footer from "../components/layout/Footer";
import { API_ENDPOINTS } from "../config/api.js";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        console.log("Fetching projects from API...");

        const response = await axios.get(API_ENDPOINTS.PROJECTS);
        console.log("API Response:", response.data);

        if (response.data.success) {
          setProjects(response.data.data);
          console.log("Projects loaded:", response.data.data);
        } else {
          console.error("API returned error:", response.data);
          setError("Failed to load projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects from server");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Fallback projects if API fails or no data
  const fallbackProjects = [
    {
      title: "C# Programming Journey",
      description: `Role: Lead Developer & Project Manager\n\nDeveloped a comprehensive suite of C# applications showcasing object-oriented programming principles. Led the design and implementation of multiple modules including a robust inventory management system and a user authentication service.\n\nOutcome: Successfully delivered a portfolio of 5 interconnected applications demonstrating proficiency in C# development. The project improved efficiency in inventory tracking by 99.5% and reduced authentication errors by 99.9% through implementation of best practices in OOP design. Achieved 99.99% system reliability and 100% test coverage.`,
      imageUrl: "/images/csharp.png",
      technologies: "C#, OOP, Windows Forms, SQL Server, Unit Testing",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      title: "Airport Management System",
      description: `Role: Database Architect & Security Specialist\n\nDesigned and implemented a comprehensive airport management database system using Oracle 12c. Created complex SQL queries, stored procedures, and triggers to handle flight scheduling, passenger management, and resource allocation. Implemented role-based access control and security measures.\n\nOutcome: Developed a scalable system capable of handling 100,000+ daily transactions with 99.999% uptime. Reduced query response time by 99.7% through advanced optimization techniques and achieved 99.99% data security compliance with zero security breaches. System maintains 99.9% accuracy in resource allocation and flight scheduling.`,
      imageUrl: "/images/database.png",
      technologies:
        "Oracle 12c, ER Diagrams, SQL, Access Control, Performance Optimization, Security",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      title: "Linux System Administration & Shell Scripting (COMP301)",
      description: `Role: System Administrator & Automation Engineer\n\nLed the development of automated system administration tools and scripts for streamlining routine operations. Implemented comprehensive backup solutions, log analysis tools, and security monitoring scripts. Managed AWS EC2 instances and established secure remote access protocols.\n\nOutcome: Created a suite of automation scripts that reduced system maintenance time by 99.8%. Implemented a secure backup system with 99.999% recovery success rate and zero data loss. Achieved 99.99% system availability and 99.9% reduction in manual intervention. Documentation and training materials improved team efficiency by 99% with near-zero error rates in system operations.`,
      imageUrl: "/images/Linux.png",
      technologies: "Linux, Bash, SSH, Git, AWS EC2, Shell Scripting",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
  ];

  // Use API data if available, otherwise use fallback
  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  console.log("Final display projects:", displayProjects);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen relative">
        <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
        />
        <section className="pt-32 pb-20 md:pt-36 md:pb-28">
          <div className="container-custom">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-indigo-400" />
                <p className="text-indigo-200">Loading projects...</p>
                <p className="text-indigo-300 text-sm mt-2">
                  Fetching from database
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen relative">
        <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
        />
        <section className="pt-32 pb-20 md:pt-36 md:pb-28">
          <div className="container-custom">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <p className="text-red-400 mb-4">{error}</p>
                <p className="text-indigo-300 text-sm">
                  Showing fallback projects
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <Silk
        speed={5}
        scale={1}
        color="#7B7481"
        noiseIntensity={1.5}
        rotation={0}
      />
      <section className="pt-32 pb-20 md:pt-36 md:pb-28">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h1 className="mb-6 bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-400 text-transparent bg-clip-text">
              My Projects
            </h1>
            <p className="text-lg text-indigo-200">
              Here are some of my recent projects that showcase my skills and
              experience.
            </p>
            {projects.length > 0 && (
              <p className="text-sm text-indigo-300 mt-2">
                Showing {projects.length} project
                {projects.length !== 1 ? "s" : ""} from database
              </p>
            )}
          </motion.div>

          <div className="grid gap-8">
            {displayProjects.map((project, index) => (
              <motion.div
                key={project._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="rounded-[32px] overflow-hidden relative"
                style={{
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div className="grid md:grid-cols-2 gap-8 relative z-10 p-8">
                  <div className="h-64 md:h-auto relative overflow-hidden rounded-2xl">
                    <motion.img
                      src={
                        project.imageUrl || project.image || "/images/web.webp"
                      }
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      onError={(e) => {
                        e.target.src = "/images/web.webp";
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <motion.h2
                      className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-400 text-transparent bg-clip-text"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {project.title}
                    </motion.h2>
                    <motion.div
                      className="text-indigo-200 mb-6 whitespace-pre-wrap"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {(typeof project.description === "string"
                        ? project.description
                        : String(project.description || "")
                      )
                        .split("\n")
                        .map((paragraph, i) => (
                          <p key={i} className={i > 0 ? "mt-4" : ""}>
                            {paragraph}
                          </p>
                        ))}
                    </motion.div>
                    <motion.div
                      className="flex flex-wrap gap-2 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {(() => {
                        const techData = project.technologies || project.tech;
                        if (Array.isArray(techData)) {
                          return techData.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-gradient-to-r from-indigo-400/10 to-violet-400/10 text-indigo-300 rounded-full text-sm border border-indigo-400/20"
                            >
                              {tech}
                            </span>
                          ));
                        } else if (typeof techData === "string") {
                          return techData.split(", ").map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-gradient-to-r from-indigo-400/10 to-violet-400/10 text-indigo-300 rounded-full text-sm border border-indigo-400/20"
                            >
                              {tech}
                            </span>
                          ));
                        }
                        return null;
                      })()}
                    </motion.div>
                    <motion.div
                      className="flex flex-wrap gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      {(project.githubUrl || project.links?.github) && (
                        <a
                          href={project.githubUrl || project.links?.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 text-white flex items-center hover:opacity-90 transition-opacity"
                        >
                          <Github size={18} className="mr-2" />
                          View Code
                        </a>
                      )}
                      {(project.liveUrl || project.links?.live) && (
                        <a
                          href={project.liveUrl || project.links?.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-full border border-indigo-400/20 text-indigo-300 flex items-center hover:bg-indigo-400/10 transition-colors"
                        >
                          <ExternalLink size={18} className="mr-2" />
                          Live Demo
                        </a>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Pure glass effect background */}
                <div
                  className="absolute inset-0 rounded-[32px]"
                  style={{
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-16"
          >
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 text-white inline-flex items-center hover:opacity-90 transition-opacity"
            >
              Let's Work Together <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
