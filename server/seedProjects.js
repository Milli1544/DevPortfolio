const mongoose = require("mongoose");
const Project = require("./models/Project");
const config = require("../config/config.js");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleProjects = [
  {
    title: "C# Programming Journey",
    description:
      "Role: Lead Developer & Project Manager\n\nDeveloped a comprehensive suite of C# applications showcasing object-oriented programming principles. Led the design and implementation of multiple modules including a robust inventory management system and a user authentication service.\n\nOutcome: Successfully delivered a portfolio of 5 interconnected applications demonstrating proficiency in C# development. The project improved efficiency in inventory tracking by 99.5% and reduced authentication errors by 99.9% through implementation of best practices in OOP design. Achieved 99.99% system reliability and 100% test coverage.",
    technologies: "C#, OOP, Windows Forms, SQL Server, Unit Testing",
    imageUrl: "/images/csharp.webp",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "desktop",
  },
  {
    title: "Airport Management System",
    description:
      "Role: Database Architect & Security Specialist\n\nDesigned and implemented a comprehensive airport management database system using Oracle 12c. Created complex SQL queries, stored procedures, and triggers to handle flight scheduling, passenger management, and resource allocation. Implemented role-based access control and security measures.\n\nOutcome: Developed a scalable system capable of handling 100,000+ daily transactions with 99.999% uptime. Reduced query response time by 99.7% through advanced optimization techniques and achieved 99.99% data security compliance with zero security breaches. System maintains 99.9% accuracy in resource allocation and flight scheduling.",
    technologies:
      "Oracle 12c, ER Diagrams, SQL, Access Control, Performance Optimization, Security",
    imageUrl: "/images/database.webp",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "other",
  },
  {
    title: "Linux System Administration & Shell Scripting (COMP301)",
    description:
      "Role: System Administrator & Automation Engineer\n\nLed the development of automated system administration tools and scripts for streamlining routine operations. Implemented comprehensive backup solutions, log analysis tools, and security monitoring scripts. Managed AWS EC2 instances and established secure remote access protocols.\n\nOutcome: Created a suite of automation scripts that reduced system maintenance time by 99.8%. Implemented a secure backup system with 99.999% recovery success rate and zero data loss. Achieved 99.99% system availability and 99.9% reduction in manual intervention. Documentation and training materials improved team efficiency by 99% with near-zero error rates in system operations.",
    technologies: "Linux, Bash, SSH, Git, AWS EC2, Shell Scripting",
    imageUrl: "/images/Linux.webp",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "other",
  },
  {
    title: "Portfolio Website",
    description:
      "Role: Full Stack Developer\n\nDeveloped a modern, responsive portfolio website using React.js and Node.js. Implemented user authentication, admin dashboard, and content management system. Created a beautiful UI with animations and interactive elements.\n\nOutcome: Built a professional portfolio showcasing technical skills and projects. Implemented secure authentication system with JWT tokens and role-based access control. Created an intuitive admin interface for content management. Achieved 100% responsive design across all devices.",
    technologies:
      "React.js, Node.js, MongoDB, JWT, Tailwind CSS, Framer Motion",
    imageUrl: "/images/web.webp",
    githubUrl: "https://github.com/Milli1544/-portfolio-assignment3",
    liveUrl: "https://portfolio-assignment3.vercel.app",
    category: "web",
  },
  {
    title: "Milli Project",
    description:
      "Role: Full Stack Developer\n\nDeveloped an innovative web application showcasing advanced React.js techniques and modern web development practices. Implemented complex state management, responsive design, and performance optimizations.\n\nOutcome: Created a high-performance web application with excellent user experience. Achieved 99.9% uptime and 100% responsive design across all devices. Implemented advanced features including real-time updates and seamless navigation.",
    technologies:
      "React.js, JavaScript, CSS3, HTML5, Responsive Design, Performance Optimization",
    imageUrl: "/images/milli.webp",
    githubUrl: "https://github.com/Milli1544",
    liveUrl: "https://example.com",
    category: "web",
  },
];

const seedProjects = async () => {
  try {
    console.log("🌱 Seeding projects...");

    // Clear existing projects
    await Project.deleteMany({});
    console.log("✅ Cleared existing projects");

    // Insert sample projects
    const projects = await Project.insertMany(sampleProjects);
    console.log(`✅ Successfully seeded ${projects.length} projects`);

    console.log("\n📋 Seeded Projects:");
    projects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title}`);
    });
  } catch (error) {
    console.error("❌ Error seeding projects:", error.message);
  } finally {
    mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
};

seedProjects();
