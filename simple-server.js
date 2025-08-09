const express = require("express");
const path = require("path");
const cors = require("cors");

// Import API functions
const healthHandler = require("./api/health");
const projectsHandler = require("./api/projects");
const qualificationsHandler = require("./api/qualifications");
const contactsHandler = require("./api/contacts");
const testHandler = require("./api/test");
const signinHandler = require("./api/auth/signin");
const signupHandler = require("./api/auth/signup");
const signoutHandler = require("./api/auth/signout");
const usersHandler = require("./api/users");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5178",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// API Routes
app.get("/api/health", async (req, res) => {
  await healthHandler(req, res);
});

app.get("/api/projects", async (req, res) => {
  await projectsHandler(req, res);
});

app.post("/api/projects", async (req, res) => {
  await projectsHandler(req, res);
});

app.get("/api/qualifications", async (req, res) => {
  await qualificationsHandler(req, res);
});

app.post("/api/qualifications", async (req, res) => {
  await qualificationsHandler(req, res);
});

app.post("/api/contacts", async (req, res) => {
  await contactsHandler(req, res);
});

app.get("/api/contacts", async (req, res) => {
  await contactsHandler(req, res);
});

app.delete("/api/contacts", async (req, res) => {
  await contactsHandler(req, res);
});

app.get("/api/test", async (req, res) => {
  await testHandler(req, res);
});

app.post("/api/auth/signin", async (req, res) => {
  await signinHandler(req, res);
});

app.post("/api/auth/signup", async (req, res) => {
  await signupHandler(req, res);
});

app.post("/api/auth/signout", async (req, res) => {
  await signoutHandler(req, res);
});

app.get("/api/users", async (req, res) => {
  await usersHandler(req, res);
});

app.put("/api/users", async (req, res) => {
  await usersHandler(req, res);
});

app.delete("/api/users", async (req, res) => {
  await usersHandler(req, res);
});

// Serve static files if they exist
const clientDistPath = path.join(__dirname, "client/dist");
if (require("fs").existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Frontend: http://localhost:5178`);
});
