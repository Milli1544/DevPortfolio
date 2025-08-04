import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownToLine,
  GraduationCap,
  Briefcase,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ProfileCard.jsx";
import Silk from "../components/Silk.jsx";
import Footer from "../components/layout/Footer.jsx";
import axios from "axios";

const About = () => {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Skills data
  const skills = [
    { name: "HTML/CSS/JavaScript", percentage: 90 },
    { name: "C#", percentage: 85 },
    { name: "Database Management", percentage: 82 },
    { name: "Linux/Unix", percentage: 80 },
    { name: "UI/UX Design", percentage: 75 },
    { name: "Software Engineering", percentage: 85 },
  ];

  // Fallback experience data (if no qualifications from API)
  const fallbackExperience = [
    {
      period: "2021 - Present",
      role: "Delivery Driver",
      company: "Hunger Hub",
      description:
        "Manage multiple deliveries efficiently using the Hunger Hub app, maintaining high customer satisfaction through professional communication and prompt service.",
    },
    {
      period: "June 2022 - August 2022",
      role: "Ebike Repair Technician",
      company: "DAYMARK",
      description:
        "Diagnosed and repaired electronic and mechanical issues, assembled new bikes, and maintained detailed documentation.",
    },
  ];

  // Fetch qualifications from API
  useEffect(() => {
    const fetchQualifications = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Fetching qualifications from API...");
        const response = await axios.get(
          "http://localhost:5000/api/qualifications"
        );

        console.log("API Response:", response.data);
        console.log("Qualifications count:", response.data.count);
        console.log("Qualifications data:", response.data.data);

        if (response.data.success) {
          setQualifications(response.data.data);
          console.log("Qualifications state updated:", response.data.data);

          // Debug: Log filtered qualifications
          const education = response.data.data.filter(
            (q) => q.type === "education"
          );
          const experience = response.data.data.filter(
            (q) => q.type === "experience"
          );
          const certification = response.data.data.filter(
            (q) => q.type === "certification"
          );

          console.log("Education qualifications:", education);
          console.log("Experience qualifications:", experience);
          console.log("Certification qualifications:", certification);
        } else {
          console.error("API returned error:", response.data);
          setError("Failed to load qualifications");
        }
      } catch (error) {
        console.error("Error fetching qualifications:", error);
        setError("Failed to load qualifications from server");
      } finally {
        setLoading(false);
      }
    };

    fetchQualifications();
  }, []);

  const handleContactClick = () => {
    // Navigate to contact section or open contact modal
    console.log("Contact clicked");
  };

  // Filter qualifications by type
  const educationQualifications = qualifications.filter(
    (q) => q.type === "education"
  );
  const certificationQualifications = qualifications.filter(
    (q) => q.type === "certification"
  );
  const experienceQualifications = qualifications.filter(
    (q) => q.type === "experience"
  );

  // Debug logging
  console.log("Current qualifications state:", qualifications);
  console.log(
    "Education qualifications count:",
    educationQualifications.length
  );
  console.log(
    "Experience qualifications count:",
    experienceQualifications.length
  );
  console.log(
    "Certification qualifications count:",
    certificationQualifications.length
  );

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.getFullYear();
  };

  // Format period for display
  const formatPeriod = (startDate, endDate) => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    return `${start} - ${end}`;
  };

  return (
    <div className="relative w-full min-h-screen">
      <Silk />

      {/* Header */}
      <section className="pt-24 pb-12 md:pt-28 md:pb-16">
        <div className="container-custom relative">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-50/50 to-primary-50/50 dark:from-dark-900/50 dark:to-dark-800/50 backdrop-blur-[2px]"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto relative"
          >
            <h1 className="mb-4 text-dark-900 dark:text-white">About Me</h1>
            <p className="text-base text-dark-600 dark:text-dark-300 mb-6">
              Get to know me, my background, and my journey in software
              development
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-white/30 dark:bg-dark-900/30 backdrop-blur-[4px]"></div>
        <div className="container-custom relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
              <div className="w-full max-w-[400px] relative z-10">
                <ProfileCard
                  name="Milyon Kifleyesus"
                  title="Software Engineering Student"
                  handle="milyonkifle"
                  status="Available for Opportunities"
                  contactText={
                    <div className="w-full px-4 py-2 text-center bg-gradient-to-r from-indigo-400 to-violet-400 rounded-xl text-white hover:opacity-90 transition-all duration-300">
                      <Link to="/contact" className="block w-full h-full">
                        Contact Me
                      </Link>
                    </div>
                  }
                  avatarUrl="/images/milli.webp"
                  showUserInfo={true}
                  enableTilt={true}
                  onContactClick={handleContactClick}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary-100/20 dark:bg-primary-900/20 rounded-xl backdrop-blur-sm"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-2xl font-bold mb-4 text-dark-900 dark:text-white">
                Who I Am
              </h2>
              <p className="text-dark-600 dark:text-dark-300 mb-3">
                I'm a passionate software development student at Centennial
                College with a strong foundation in client-side web development
                and programming. I specialize in creating responsive websites
                and applications while maintaining a focus on software
                engineering principles.
              </p>
              <p className="text-dark-600 dark:text-dark-300 mb-4">
                With experience in various technologies including HTML, CSS,
                JavaScript, and C#, I'm constantly learning and adapting to new
                technologies. I have a particular interest in database
                management and UI/UX design.
              </p>

              {/* NEW CONTENT FOR ASSIGNMENT 4 CI/CD DEMONSTRATION */}
              <p className="text-dark-600 dark:text-dark-300 mb-4">
                I am currently working on COMP229 - Web Application Development
                at Centennial College, where I've developed this portfolio
                application using modern web technologies including React,
                Node.js, and MongoDB. This project demonstrates my skills in
                full-stack development, API design, and cloud deployment. The
                application includes comprehensive testing with unit tests and
                E2E testing using Cypress, as well as a complete CI/CD pipeline
                for automated deployment.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-dark-500 dark:text-dark-400 text-sm">
                    Name:
                  </p>
                  <p className="font-medium text-dark-900 dark:text-white">
                    Milyon Kifleyesus
                  </p>
                </div>
                <div>
                  <p className="text-dark-500 dark:text-dark-400 text-sm">
                    Email:
                  </p>
                  <p className="font-medium text-dark-900 dark:text-white">
                    milyon.kifleyesus@email.com
                  </p>
                </div>
                <div>
                  <p className="text-dark-500 dark:text-dark-400 text-sm">
                    Phone:
                  </p>
                  <p className="font-medium text-dark-900 dark:text-white">
                    (647) 809-3271
                  </p>
                </div>
                <div>
                  <p className="text-dark-500 dark:text-dark-400 text-sm">
                    Location:
                  </p>
                  <p className="font-medium text-dark-900 dark:text-white">
                    York, ON
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href="/public/Resume.pdf"
                  className="btn-primary flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download CV <ArrowDownToLine size={18} className="ml-2" />
                </a>
                <Link to="/contact" className="btn-outline">
                  Contact Me
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-gray-50/30 dark:bg-dark-800/30 backdrop-blur-[4px]"></div>
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-3 text-dark-900 dark:text-white">My Skills</h2>
            <p className="text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              Here's a breakdown of my technical expertise and skill levels
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-dark-800 dark:text-dark-200">
                    {skill.name}
                  </span>
                  <span className="text-primary-500 dark:text-primary-400">
                    {skill.percentage}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-600 dark:to-secondary-600 rounded-full"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Experience Section */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-white/30 dark:bg-dark-900/30 backdrop-blur-[4px]"></div>
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-3 text-dark-900 dark:text-white">
              Education & Experience
            </h2>
            <p className="text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
              My academic background and professional journey
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education Timeline */}
            <div>
              <div className="flex items-center mb-6">
                <GraduationCap
                  size={20}
                  className="text-primary-500 dark:text-primary-400 mr-3"
                />
                <h3 className="text-lg font-bold text-dark-900 dark:text-white">
                  Education
                </h3>
              </div>
              <div className="space-y-6">
                {loading ? (
                  <div className="text-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-500" />
                    <p className="text-dark-600 dark:text-dark-300">
                      Loading education...
                    </p>
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <p className="text-red-500 dark:text-red-400 mb-4">
                      {error}
                    </p>
                    <p className="text-dark-600 dark:text-dark-300 text-sm">
                      Using fallback data while we fix the connection.
                    </p>
                  </div>
                ) : educationQualifications.length > 0 ? (
                  educationQualifications.map((qualification, index) => (
                    <motion.div
                      key={qualification._id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="relative pl-8 border-l-2 border-dark-200 dark:border-dark-700"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-500 dark:bg-primary-400"></div>
                      <span className="text-sm text-primary-500 dark:text-primary-400 font-medium mb-2 block">
                        {formatPeriod(
                          qualification.startDate,
                          qualification.endDate
                        )}
                      </span>
                      <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
                        {qualification.degree}
                      </h4>
                      <p className="text-dark-600 dark:text-dark-300 mb-2">
                        {qualification.institution}
                      </p>
                      <p className="text-dark-500 dark:text-dark-400 text-sm mb-2">
                        {qualification.field}
                      </p>
                      {qualification.grade && (
                        <p className="text-dark-500 dark:text-dark-400 text-sm mb-2">
                          Grade: {qualification.grade}
                        </p>
                      )}
                      {qualification.description && (
                        <p className="text-dark-500 dark:text-dark-400 text-sm">
                          {qualification.description}
                        </p>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-dark-600 dark:text-dark-300">
                      No education records found.
                      <br />
                      <span className="text-sm text-dark-500 dark:text-dark-400">
                        Admin can add education records through the admin
                        dashboard.
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Experience Timeline */}
            <div>
              <div className="flex items-center mb-6">
                <Briefcase
                  size={20}
                  className="text-primary-500 dark:text-primary-400 mr-3"
                />
                <h3 className="text-lg font-bold text-dark-900 dark:text-white">
                  Experience
                </h3>
              </div>
              <div className="space-y-6">
                {loading ? (
                  <div className="text-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-500" />
                    <p className="text-dark-600 dark:text-dark-300">
                      Loading experience...
                    </p>
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <p className="text-red-500 dark:text-red-400 mb-4">
                      {error}
                    </p>
                    <p className="text-dark-600 dark:text-dark-300 text-sm">
                      Using fallback data while we fix the connection.
                    </p>
                  </div>
                ) : experienceQualifications.length > 0 ? (
                  experienceQualifications.map((qualification, index) => (
                    <motion.div
                      key={qualification._id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="relative pl-8 border-l-2 border-dark-200 dark:border-dark-700"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-500 dark:bg-primary-400"></div>
                      <span className="text-sm text-primary-500 dark:text-primary-400 font-medium mb-2 block">
                        {formatPeriod(
                          qualification.startDate,
                          qualification.endDate
                        )}
                      </span>
                      <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
                        {qualification.degree}
                      </h4>
                      <p className="text-dark-600 dark:text-dark-300 mb-2">
                        {qualification.institution}
                      </p>
                      {qualification.description && (
                        <p className="text-dark-500 dark:text-dark-400 text-sm">
                          {qualification.description}
                        </p>
                      )}
                    </motion.div>
                  ))
                ) : (
                  fallbackExperience.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="relative pl-8 border-l-2 border-dark-200 dark:border-dark-700"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-500 dark:bg-primary-400"></div>
                      <span className="text-sm text-primary-500 dark:text-primary-400 font-medium mb-2 block">
                        {item.period}
                      </span>
                      <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
                        {item.role}
                      </h4>
                      <p className="text-dark-600 dark:text-dark-300 mb-2">
                        {item.company}
                      </p>
                      <p className="text-dark-500 dark:text-dark-400 text-sm">
                        {item.description}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Certifications Section (if any) */}
          {certificationQualifications.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center mb-6">
                <Briefcase
                  size={20}
                  className="text-primary-500 dark:text-primary-400 mr-3"
                />
                <h3 className="text-lg font-bold text-dark-900 dark:text-white">
                  Certifications
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {certificationQualifications.map((qualification, index) => (
                  <motion.div
                    key={qualification._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                  >
                    <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
                      {qualification.degree}
                    </h4>
                    <p className="text-dark-600 dark:text-dark-300 mb-2">
                      {qualification.institution}
                    </p>
                    <p className="text-sm text-primary-500 dark:text-primary-400 mb-2">
                      {formatPeriod(
                        qualification.startDate,
                        qualification.endDate
                      )}
                    </p>
                    {qualification.description && (
                      <p className="text-dark-500 dark:text-dark-400 text-sm">
                        {qualification.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-gray-50/30 dark:bg-dark-800/30 backdrop-blur-[4px]"></div>
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center relative z-10"
          >
            <h2 className="mb-4 text-dark-900 dark:text-white">
              Ready to Work Together?
            </h2>
            <p className="text-dark-600 dark:text-dark-300 mb-6 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your visions.
            </p>
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center"
            >
              Get in Touch <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
