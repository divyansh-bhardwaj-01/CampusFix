# CampusFix 🎓

**A Campus Issue Reporting and Management System**

CampusFix is a web-based application designed to make campus issue reporting easier, faster, and more organized. It provides students with a platform to report campus-related problems and track their submitted complaints.

The goal is to improve communication between students and campus administration while making issue management more transparent and efficient.

## 🚀 Features

- **User Authentication:** Secure login and session management.
- **Dashboard:** Access the main features from one place.
- **Report Issues:** Submit complaints about campus-related problems.
- **My Reports:** View previously submitted reports.
- **Profile Management:** Access user profile information.
- **Report Tracking:** View report submission details and status.
- **Session Management:** Maintain user sessions using MongoDB.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB Atlas | Database |
| EJS | Server-side templating |
| HTML5 | Page structure |
| CSS3 | Styling |
| JavaScript | Application logic |
| express-session | Session management |
| connect-mongo | MongoDB session storage |
| Git & GitHub | Version control |

## 📁 Project Structure

```text
CampusFix/
│
├── public/              # Static files (CSS, JS, images)
│
├── views/               # EJS templates
│
├── app.js               # Express application and routes
├── server.js            # Application entry point
├── package.json         # Dependencies and scripts
├── package-lock.json    # Dependency lock file
├── .gitignore           # Ignored files
└── README.md            # Project documentation
```
## 🗄️ Database

CampusFix uses MongoDB Atlas for storing application data.

Database: `college`

Collections:

- `students` – Student account information.
- `issues` – Submitted campus issues.
- `sessions` – User session information.

## 🌐 Deployment

The application is configured for deployment using Render.

Deployment requirements:

- Node.js 24.x
- MongoDB Atlas connection
- Environment variables configured on Render
- Production environment set to `NODE_ENV=production`

## 🔒 Security

- Environment variables are used for sensitive configuration.
- Session cookies use HTTP-only protection.
- MongoDB stores application and session data.
- Production cookies are configured for secure connections.

## 🎯 Project Objective

CampusFix aims to simplify campus issue reporting by providing a centralized digital platform where students can submit complaints and access their report information.

## 👨‍💻 Developer

**Divyansh Bhardwaj**

GitHub: [@divyansh-bhardwaj-01](https://github.com/divyansh-bhardwaj-01)

---

⭐ If you find this project useful, consider giving it a star!

**CampusFix — Making Campus Problem Reporting Easier.**
