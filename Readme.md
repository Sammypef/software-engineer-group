Greetings, TA's or Instructor

# Welcome to Our Git REPO

This Project is part of the CPE334 Subject: Software Engineering. To understand the Principles and techniques used to create functionally correct, easy-to-use, robust, reliable, and maintainable software systems. Phases of the software development lifecycle, focusing on practical approaches. Team-based collaborative term project that requires students to analyze a proposed software system and produce a set of development artifacts typical of a real-world software development project.
In this case, we are doing webapp called "lyriclingo" which Let user learning multiples languages via songs with gamification (guess what it's referenced). 

# LyricLingo - Language Learning Through Music 🎵

## Project Overview
LyricLingo is a web application developed for CPE334 Software Engineering that enables users to learn multiple languages through songs with gamification elements. This project demonstrates the principles and techniques used to create functionally correct, easy-to-use, robust, reliable, and maintainable software systems.

---

## 📋 Prerequisites

Before running this application, ensure you have the following installed on your system:

- **Node.js** (v14.0.0 or higher recommended)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`
- **npm** (comes with Node.js)
  - Verify installation: `npm --version`
- **Git**
  - Download from: https://git-scm.com/
  - Verify installation: `git --version`

---

## ❗ Known Issues

1. Google OAuth has been disabled with the current key in the firebase build
2. Navigating to Learning and Music on the Profile page is impossible
3. Several UI inconsistencies across pages
4. Lyrics do not scroll along with music

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Sammypef/software-engineer-group.git
cd software-engineer-group
```

### Step 2: Install Root Dependencies

From the root directory, install any root-level dependencies:

```bash
npm install
```

### Step 3: Set Up the Backend Server

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

**Configure Environment Variables:**

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
# Add any database connection strings here
# DATABASE_URL=your_database_url_here
# Add any API keys required
# API_KEY=your_api_key_here
```

> **Note:** The actual environment variables needed may vary. Check with the development team or look for an `.env.example` file in the server directory.

### Step 4: Set Up the Frontend (React App)

Navigate to the React app directory and install dependencies:

```bash
cd ../my-react-app
npm install
```

---

## ▶️ Running the Application

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Start the Backend Server:**

```bash
cd server
npm start
```

The backend should start on `http://localhost:5000` (or the port specified in your .env file)

**Terminal 2 - Start the Frontend:**

```bash
cd my-react-app
npm run dev
```

The React app should automatically open in your browser at `http://localhost:5173`

### Option 2: Run from Root Directory (if configured)

If there are scripts configured in the root `package.json`:

```bash
# From the root directory
npm run dev  # This might start both frontend and backend concurrently
```

---

## 🔍 Verifying the Installation

1. **Backend Verification:**
   - Check the terminal where the server is running for any error messages
   - The server should display a message like "Server running on port 5000"
   - You can test the API by navigating to `http://localhost:5000` in your browser

2. **Frontend Verification:**
   - The React app should open automatically in your default browser
   - You should see the LyricLingo interface
   - Check the browser console (F12) for any errors

---

## 🛠️ Troubleshooting

### Common Issues and Solutions

**Problem: Port already in use**
```bash
# Kill the process using the port (example for port 3000)
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

**Problem: Module not found errors**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Problem: Cannot connect to backend**
- Ensure the backend server is running
- Check that the API URL in the frontend code matches your backend port
- Verify CORS is properly configured on the backend

**Problem: Database connection errors**
- Verify your `.env` file has the correct database credentials
- Ensure your database service is running
- Check network connectivity to the database

---

## 📁 Project Structure

```
software-engineer-group/
├── my-react-app/          # Frontend React application
│   ├── src/               # React source code
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── server/                # Backend Node.js server
│   ├── index.js           # Main server file
│   └── package.json       # Backend dependencies
├── package.json           # Root package.json
├── lyricicon.png          # Application icon
└── README.md              # This file
```

---

## 🧪 Testing

To run tests (if available):

```bash
# Frontend tests
cd my-react-app
npm test

# Backend tests
cd server
npm test
```

---

## 👥 Contributors

This project was developed by the CPE334 Software Engineering group SE08. Right now, the repo's contributions are from Sl1myz because of the .env accident that we have to rewrite the entire git history with a tool to bulk.

---

## 📝 Additional Notes

- The application uses React for the frontend with various libraries (check `my-react-app/package.json` for specifics)
- The backend is built with Node.js/Express (verify in `server/package.json`)
- Icon assets are available in the root directory (`lyricicon.png`)

---

## 📄 License

This project is part of an academic assignment for CPE334 Software Engineering.

---

**Last Updated:** December 2024

**Course:** CPE334 - Software Engineering

**Institution:** [King Mongkut's University of Technology Thonburi]
