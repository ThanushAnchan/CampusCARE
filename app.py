import os
import json
from flask import Flask, render_template, send_from_directory, request, jsonify

# Set root directory as both template and static folder for zero-friction file loading
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, template_folder=BASE_DIR, static_folder=BASE_DIR)

@app.route("/")
def home():
    """Serves the CampusCARE landing and login portal"""
    return send_from_directory(BASE_DIR, "index.html")

@app.route("/student")
@app.route("/student-complaint.html")
def student_complaint():
    """Serves the Student Complaint & Tracking Portal"""
    return send_from_directory(BASE_DIR, "student-complaint.html")

@app.route("/staff")
@app.route("/staff-login.html")
def staff_dashboard():
    """Serves the Staff Maintenance & Resolution Console"""
    return send_from_directory(BASE_DIR, "staff-login.html")

@app.route("/<path:filename>")
def serve_static(filename):
    """Serves CSS, JS, and image background assets"""
    return send_from_directory(BASE_DIR, filename)

if __name__ == '__main__':
    print("=" * 60)
    print("🚀 CampusCARE Server Running!")
    print("🌐 Open Portal at: http://127.0.0.1:5000/")
    print("🧑🏻‍🎓 Student Desk:  http://127.0.0.1:5000/student")
    print("🧑🏻‍🔧 Staff Console: http://127.0.0.1:5000/staff")
    print("=" * 60)
    app.run(debug=True, port=5000)