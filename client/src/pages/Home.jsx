import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code,
  Globe,
  Palette,
  BrainCircuit,
  CheckCircle2,
  Github,
  ExternalLink,
} from "lucide-react";
import Silk from "../components/Silk";
import Footer from "../components/layout/Footer";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen relative">
      <Silk
        speed={5}
        scale={1}
        color="#7B7481"
        noiseIntensity={1.5}
        rotation={0}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-36 md:pb-28">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-400 text-transparent bg-clip-text">
              Hi, I'm <span className="text-blue-400">Milyon Kifleyesus</span>
            </h1>

            <div className="mb-6 text-xl md:text-2xl lg:text-3xl text-indigo-200">
              Software Developer
            </div>

            <p className="mb-8 text-base md:text-lg text-indigo-300 max-w-3xl mx-auto">
              A passionate software engineering student specializing in web
              development, database management, and creating user-friendly
              applications.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                to="/projects"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-400 to-violet-400 hover:opacity-90 text-white font-medium rounded-lg transition-all duration-300"
              >
                View My Work <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 border-2 border-indigo-400/20 text-indigo-300 hover:bg-indigo-400/10 hover:text-indigo-200 font-medium rounded-lg transition-all duration-300"
              >
                Get In Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-3 text-3xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 text-transparent bg-clip-text">
              What I Do
            </h2>
            <p className="text-indigo-300 max-w-3xl mx-auto">
              I specialize in creating innovative solutions across multiple
              domains
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code size={32} />,
                title: "Web Development",
                description:
                  "Building modern, responsive web applications using React, Node.js, and modern web technologies.",
                features: [
                  "Frontend Development",
                  "Backend APIs",
                  "Database Design",
                  "Responsive UI/UX",
                ],
              },
              {
                icon: <Palette size={32} />,
                title: "Software Engineering",
                description:
                  "Developing robust software solutions using C# and object-oriented programming principles.",
                features: [
                  "C# Development",
                  "OOP Design",
                  "System Architecture",
                  "Testing & Debugging",
                ],
              },
              {
                icon: <Globe size={32} />,
                title: "Database Management",
                description:
                  "Designing and optimizing database systems for efficient data storage and retrieval.",
                features: [
                  "SQL Development",
                  "Database Design",
                  "Performance Optimization",
                  "Data Security",
                ],
              },
              {
                icon: <BrainCircuit size={32} />,
                title: "System Administration",
                description:
                  "Managing and maintaining Linux/Unix systems with automation and security best practices.",
                features: [
                  "Linux Administration",
                  "Shell Scripting",
                  "AWS Cloud Services",
                  "Security Implementation",
                ],
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="rounded-[32px] overflow-hidden relative"
                style={{
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div className="p-8 relative z-10">
                  <div className="mb-6 text-indigo-400 flex justify-center">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-indigo-200 text-center">
                    {service.title}
                  </h3>
                  <p className="text-indigo-300 text-sm mb-6 text-center">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-indigo-400 mr-3 flex-shrink-0"
                        />
                        <span className="text-indigo-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
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
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-3 text-3xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 text-transparent bg-clip-text">
              My Skills
            </h2>
            <p className="text-indigo-300 max-w-3xl mx-auto">
              Here are some of the key technologies and tools I work with
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Code size={32} />,
                title: "Web Development",
                desc: "HTML, CSS, JavaScript, Responsive Design",
              },
              {
                icon: <Palette size={32} />,
                title: "Software Engineering",
                desc: "C#, Object-Oriented Programming",
              },
              {
                icon: <Globe size={32} />,
                title: "Database Management",
                desc: "SQL, Database Design",
              },
              {
                icon: <BrainCircuit size={32} />,
                title: "System Administration",
                desc: "Linux/Unix, Operating Systems",
              },
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="rounded-[32px] overflow-hidden relative"
                style={{
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div className="p-6 text-center relative z-10">
                  <div className="mb-3 text-indigo-400 flex justify-center">
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-indigo-200">
                    {skill.title}
                  </h3>
                  <p className="text-indigo-300 text-sm">{skill.desc}</p>
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
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-3 text-3xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 text-transparent bg-clip-text">
              Featured Projects
            </h2>
            <p className="text-indigo-300 max-w-3xl mx-auto">
              Here are some of my recent projects that showcase my skills and
              expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "C# Programming Journey",
                description:
                  "A comprehensive suite of C# applications showcasing object-oriented programming principles. Features inventory management and user authentication systems.",
                image: "/images/csharp.png",
                technologies: ["C#", "OOP", "Windows Forms", "SQL Server"],
                githubUrl: "https://github.com",
                liveUrl: "https://example.com",
              },
              {
                title: "Airport Management System",
                description:
                  "A comprehensive airport management database system using Oracle 12c. Handles flight scheduling, passenger management, and resource allocation.",
                image: "/images/database.png",
                technologies: ["Oracle 12c", "SQL", "ER Diagrams", "Security"],
                githubUrl: "https://github.com",
                liveUrl: "https://example.com",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="rounded-[32px] overflow-hidden relative"
                style={{
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div className="p-8 relative z-10">
                  <div className="mb-6">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-2xl"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "/images/web.webp";
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-indigo-200">
                    {project.title}
                  </h3>
                  <p className="text-indigo-300 text-sm mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gradient-to-r from-indigo-400/10 to-violet-400/10 text-indigo-300 rounded-full text-sm border border-indigo-400/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-400/10 to-violet-400/10 border border-indigo-400/20 text-indigo-300 hover:text-white hover:bg-gradient-to-r hover:from-indigo-400 hover:to-violet-400 transition-all duration-300"
                    >
                      <Github size={16} />
                      <span className="text-sm">Code</span>
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-400 to-violet-400 text-white hover:opacity-90 transition-all duration-300"
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Live Demo</span>
                    </a>
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
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center mt-12"
          >
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-400 to-violet-400 hover:opacity-90 text-white font-medium rounded-lg transition-all duration-300"
            >
              View All Projects <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
