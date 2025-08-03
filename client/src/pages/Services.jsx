import { motion } from "framer-motion";
import { Code, Database, Layout, Rocket } from "lucide-react";
import Silk from "../components/Silk";
import Footer from "../components/layout/Footer";

const Services = () => {
  const services = [
    {
      icon: <Code size={32} />,
      title: "Web Development",
      description:
        "Creating responsive and modern web applications using the latest technologies.",
      features: [
        "Frontend Development",
        "Backend Development",
        "API Integration",
        "Performance Optimization",
      ],
    },
    {
      icon: <Database size={32} />,
      title: "Database Design",
      description:
        "Designing and implementing efficient database solutions for your applications.",
      features: [
        "Database Architecture",
        "Data Modeling",
        "Query Optimization",
        "Data Migration",
      ],
    },
    {
      icon: <Layout size={32} />,
      title: "UI/UX Design",
      description:
        "Creating intuitive and beautiful user interfaces with great user experience.",
      features: [
        "Wireframing",
        "Prototyping",
        "User Research",
        "Interface Design",
      ],
    },
    {
      icon: <Rocket size={32} />,
      title: "Project Management",
      description:
        "Managing projects from conception to delivery with agile methodologies.",
      features: [
        "Agile Development",
        "Sprint Planning",
        "Risk Management",
        "Team Leadership",
      ],
    },
  ];

  return (
    <div className="relative">
      <Silk
        speed={5}
        scale={1}
        color="#7B7481"
        noiseIntensity={1.5}
        rotation={0}
      />
      <div className="min-h-screen py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">My Services</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Comprehensive solutions for your digital needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg text-primary-600 dark:text-primary-400">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold ml-4">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-700 dark:text-gray-300"
                    >
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
