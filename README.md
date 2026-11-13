# 🏫 CampusCARE - Campus Maintenance & Grievance Resolution Portal

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Web-emerald.svg)]()
[![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)]()

> A modern, glassmorphic campus facility management and student grievance resolution web application. Enables students to report infrastructure issues instantly and empowers maintenance staff to track, assign, resolve, and audit grievances in real time.

---

## 🌟 Key Features

### 🧑🏻‍🎓 Student Grievance Desk (`student-complaint.html`)
- **Quick Complaint Logging**: Submit issues categorized by Electricity, Plumbing, Wi-Fi & IT, Furniture, Sanitation, and more.
- **Priority & Location Tagging**: Set urgency (Urgent, High, Medium, Low) and specific campus location.
- **Photo Evidence Attachment**: Upload image proof of physical infrastructure issues.
- **4-Stage Live Resolution Timeline**: Visual stepper showing `Submitted` → `Under Review` → `Technician Active` → `Resolved`.
- **Quality Feedback & Rating**: Students can rate completed work from 1 to 5 stars and leave remarks.
- **Withdrawal**: Students can cancel or withdraw pending complaints.

### 🧑🏻‍🔧 Staff Maintenance Command Center (`staff-login.html`)
- **Real-Time KPI Dashboard**: Live metrics tracking Total Grievances, Pending Review, In Progress, Resolved Tickets, Resolution Rate (%), and Average Satisfaction Rating.
- **Ticket Management**: Update status, assign technician teams (Electrical, Plumbing, IT, Carpentry, Housekeeping), and record resolution remarks.
- **Delete Problem Records**: Permanently remove resolved, duplicate, or invalid grievance tickets.
- **Search & Multi-Facet Filtering**: Filter tickets by status, category, priority, or search by keywords, USN, and student name.
- **Export to CSV**: One-click grievance report generation for administrative auditing and reporting.
- **Printable Reports**: Native print-friendly view for campus review meetings.

### 🎨 Personalization & Architecture
- **Interactive Theme / Wallpaper Engine**: Switch between 4 high-definition architectural campus backgrounds with dynamic glassmorphism.
- **Cross-Tab Live Synchronization**: Real-time state updates across multiple browser tabs via local storage event broadcasting.
- **Zero-Dependency Core**: Runs out-of-the-box directly in any modern browser or hosted via Flask.

---

## 📂 Project Structure

```
CampusCARE/
├── index.html                 # Main landing portal & role entry point
├── student-complaint.html     # Student grievance submission & tracking desk
├── staff-login.html           # Staff command center & technician dispatch
├── campus-data.js             # Data store, state management & analytics engine
├── style.css                  # Modern glassmorphism UI styles & animations
├── app.py                     # Optional lightweight Python Flask backend server
├── campus-background*.jpeg    # Campus architectural background wallpapers
├── .gitignore                 # Git ignore file
└── README.md                  # Project documentation
```

---

## 🚀 Getting Started

### Option 1: Run with Python Flask Server (Recommended)
1. Make sure Python 3 is installed.
2. Install Flask:
   ```bash
   pip install flask
   ```
3. Start the server:
   ```bash
   python app.py
   ```
4. Open your browser and navigate to:
   - **Landing Page**: `http://127.0.0.1:5000/`
   - **Student Desk**: `http://127.0.0.1:5000/student`
   - **Staff Console**: `http://127.0.0.1:5000/staff`

### Option 2: Open Directly in Browser (No Server Needed)
Simply double-click `index.html` in your file explorer to open it in Chrome, Edge, Firefox, or any modern web browser.

---

## 🛠️ Built With

- **HTML5 & CSS3** (Custom properties, flexbox, grid, glassmorphism)
- **Vanilla JavaScript (ES6+)** (LocalStorage state management, reactive event dispatch)
- **Python / Flask** (Local development web server)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

