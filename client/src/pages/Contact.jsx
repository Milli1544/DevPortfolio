import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Send,
  Mail as MailIcon,
  Phone,
  MapPin,
  Linkedin,
} from "lucide-react"; // Fixed Mail import for production
import Silk from "../components/Silk.jsx";
import { API_ENDPOINTS } from "../config/api.js";
import Footer from "../components/layout/Footer.jsx";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    setIsSubmitting(true);
    try {
      const response = await fetch(API_ENDPOINTS.CONTACTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log("Response:", response.status);
      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        setShowSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert(
          "Failed to send message: " + (errorData.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
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
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h1>
            <p className="text-indigo-300 max-w-3xl mx-auto text-lg">
              Have a question or want to work together? I'd love to hear from
              you. Let's discuss your next project!
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 flex items-center"
                >
                  <CheckCircle2 size={20} className="mr-2" />
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-indigo-200"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-300"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-indigo-200"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-300"
                    placeholder="mili.kifleyesus@gmail.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-indigo-200"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or ask me anything..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="pb-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Other Ways to Connect
              </span>
            </h2>
            <p className="text-indigo-300 max-w-2xl mx-auto">
              Prefer a different way to get in touch? Here are some alternative
              ways to reach me.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <MailIcon size={32} />,
                title: "Email",
                value: "mili.kifleyesus@gmail.com",
                link: "mailto:mili.kifleyesus@gmail.com",
                description: "Send me an email anytime",
              },
              {
                icon: <Phone size={32} />,
                title: "Phone",
                value: "6478093271",
                link: "tel:+16478093271",
                description: "Call me during business hours",
              },
              {
                icon: <MapPin size={32} />,
                title: "Location",
                value: "Toronto, Canada",
                link: "#",
                description: "Based in Toronto, Ontario",
              },
              {
                icon: <Linkedin size={32} />,
                title: "LinkedIn",
                value: "linkedin.com/in/milyon",
                link: "https://www.linkedin.com/in/milyon-kifleyesus-9170b1364?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                description: "Connect with me professionally",
              },
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="group"
              >
                <a
                  href={contact.link}
                  target={contact.link.startsWith("http") ? "_blank" : "_self"}
                  rel={
                    contact.link.startsWith("http") ? "noopener noreferrer" : ""
                  }
                  className="block p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-indigo-400/50 hover:bg-white/15 transition-all duration-300 text-center group"
                >
                  <div className="text-indigo-400 mb-4 group-hover:text-indigo-300 transition-colors duration-300">
                    {contact.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    {contact.title}
                  </h3>
                  <p className="text-indigo-300 mb-2">{contact.value}</p>
                  <p className="text-sm text-indigo-400/70">
                    {contact.description}
                  </p>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Contact;
