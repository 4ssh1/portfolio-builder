# 🧑‍💻 Portfolio Builder Web App

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Tech](https://img.shields.io/badge/stack-MERN-purple)

A portfolio builder that allows users to register, upload projects, showcase skills, track profile views, and receive updates via newsletters.

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT, bcrypt
- **File Uploads:** Cloudinary, multer
- **Email Service:** Nodemailer
- **API Docs:** Swagger (Live Docs)
- **Testing:** Jest
- **Notifications:** Web socket

---

## 📦 Features

- 🔐 User registration & login (JWT-based)
- 👤 Editable user profiles
- 💾 Project uploads (with Cloudinary integration)
- 📊 Profile view tracking
- 🔍 Project filtering by category (frontend, backend, all)
- 🔎 Search functionality
- 📬 Newsletter subscription
- 📘 Live Swagger API docs

---

## Installation

To get started, follow these steps:

1. Clone the repository:
   ```bash
     https://github.com/4ssh1/portfolio-builder.git
     cd portfolio-builder
   ```
   

2. Install dependencies:
   ```bash
     npm install
   ```

3. Set Up Environment Variables: Create a .env file in the root directory and add the necessary environment variables    

4. Start the server:
   ```bash
     npm start
   ```

---

## 📁 Project Structure

```
├── backend/
app.js
config
├── cloudinaryConfig.js
controllers
├── authController.js
├── engagementController.js
├── projectController.js
├── userController.js
middlewares
├── protect.js
├── rateLimiter.js
├── token.js
models
├── engagementModel.js
├── projectModel.js
├── subscriberModel.js
├── userModel.js
package-lock.json
package.json
README.md
routes
├── profileRoute.js
├── projectRoute.js
├── userRoute.js
swagger
├── swagger.js
tests
├── authTest.js
├── profileTest.js
├── projectTest.js
utils
├── cloudinary.js
├── emailService.js
├── helpers
│   ├── serverErrorHandler.js
├── multer.js
```

---

## 📅 Timeline

This project was developed during a 4-week sprint. Check the project plan document for weekly goals and assignments.

---

# 🤝 Contributing

We welcome contributions to the **Portfolio Project**! Whether it's fixing a bug, adding a feature, improving documentation, or suggesting ideas, your contributions are highly appreciated.

## 🛠 How to Contribute

1. **Fork the Repository**:
   - Click the "Fork" button on the top right of this repository to create your own copy.

2. **Clone the Forked Repository**:
   - Clone your fork to your local machine:
     ```bash
     git clone https://github.com/<your-username>/Jodna-portfolio-project-backend.git
     cd Jodna-portfolio-project-backend
     ```

3. **Create a New Branch**:
   - Create a branch for your feature or bug fix:
     ```bash
     git checkout -b feature/your-feature-name
     ```

4. **Make Changes**:
   - Make your changes in the codebase. Ensure your changes follow the project's coding standards.

5. **Test Your Changes**:
   - If applicable, write tests for your changes and run them to ensure everything works:
     ```bash
     npm test
     ```

6. **Commit Your Changes**:
   - Write a clear and concise commit message:
     ```bash
     git add .
     git commit -m "Add: Your descriptive commit message"
     ```

7. **Push to Your Fork**:
   - Push your changes to your forked repository:
     ```bash
     git push origin feature/your-feature-name
     ```

8. **Open a Pull Request (PR)**:
   - Navigate to the original repository and click on "New Pull Request".
   - Select your branch and provide a detailed description of your changes.

## 🛡 Guidelines

- Follow the [Code of Conduct](CODE_OF_CONDUCT.md) (if applicable).
- Ensure your code passes all tests before submitting.
- Make sure your branch is up to date with the `main` branch:
  ```bash
  git checkout main
  git pull origin main
  git merge feature/your-feature-name

---

## 📄 License

MIT License © 2025

---
