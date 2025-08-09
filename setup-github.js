const { execSync } = require("child_process");

console.log("🚀 GitHub Repository Setup Helper\n");

console.log("📋 Follow these steps to add your project to GitHub:\n");

console.log("1. Go to https://github.com and sign in");
console.log("2. Click the '+' button and select 'New repository'");
console.log("3. Fill in the repository details:");
console.log("   - Repository name: portfolio-assignment3");
console.log(
  "   - Description: Professional portfolio website with admin dashboard"
);
console.log("   - Visibility: Public (or Private if you prefer)");
console.log("   - ✅ Add a README file");
console.log("   - ✅ Add .gitignore (Node)");
console.log("   - ✅ Choose a license (MIT)");
console.log("4. Click 'Create repository'\n");

console.log("5. After creating the repository, GitHub will show you commands.");
console.log("   Copy the URL of your new repository (it will look like:");
console.log("   https://github.com/YOUR_USERNAME/portfolio-assignment3.git)\n");

console.log("6. Then run these commands in your terminal:\n");

console.log(
  "   # Add the remote origin (replace YOUR_USERNAME with your GitHub username)"
);
console.log(
  "   git remote add origin https://github.com/YOUR_USERNAME/portfolio-assignment3.git"
);
console.log("");
console.log("   # Push to GitHub");
console.log("   git push -u origin main\n");

console.log("🎯 Your project is ready to be pushed to GitHub!");
console.log("📁 All files are committed and ready");
console.log("📖 README.md is comprehensive and professional");
console.log("🔒 .gitignore is properly configured");
console.log("📄 LICENSE file is included\n");

console.log("🌟 Once you push to GitHub, you'll have:");
console.log("- ✅ Professional repository");
console.log("- ✅ Complete documentation");
console.log("- ✅ Deployment instructions");
console.log("- ✅ API documentation");
console.log("- ✅ Setup guides");
console.log("- ✅ Ready for collaboration\n");

console.log("🚀 Happy coding!");
