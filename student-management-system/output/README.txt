STUDENT MANAGEMENT SYSTEM — RUNNING GUIDE

STACK
- Frontend: React 19 + Vite
- Backend: PHP API
- Database: MySQL

PROJECT FOLDERS
- frontend/student-registration: React application
- backend/student_backend: PHP API
- database/student_registration.sql: database and table setup

WINDOWS SETUP (XAMPP)
1. Install Node.js LTS and XAMPP.
2. Extract this project.
3. Copy the folder output/backend/student_backend into C:\xampp\htdocs\student_backend.
   The resulting path must contain C:\xampp\htdocs\student_backend\db.php.
4. Open XAMPP Control Panel and start Apache and MySQL.
5. Open http://localhost/phpmyadmin.
6. Choose Import, select output/database/student_registration.sql, then click Import.
   This creates the student_registration database and students table.
7. Check backend/student_backend/db.php. Default local XAMPP credentials are:
   host=localhost, username=root, password is blank, database=student_registration.
   Change these values if your MySQL account uses a password.
8. Open a terminal in output/frontend/student-registration.
9. Run: npm install
10. Run: npm run dev
11. Open the Vite address printed in the terminal (usually http://localhost:5173).

QUICK START ON WINDOWS
After completing the XAMPP and database steps above, double-click
frontend/student-registration/start-frontend.bat. It installs npm dependencies
when node_modules is absent, creates .env from .env.example when needed, and
starts Vite.

API / DATABASE CONNECTION
React uses VITE_API_BASE_URL (default http://localhost/student_backend).
The PHP API connects to MySQL using backend/student_backend/db.php.
Endpoints used by React:
- GET  /get_records.php
- POST /register.php
- POST /delete_student.php
The PHP registration endpoint hashes passwords before saving them.

TROUBLESHOOTING
- If the browser reports Failed to fetch, confirm Apache is running and open
  http://localhost/student_backend/get_records.php directly. Also check the
  Vite URL is allowed in db.php's allowedOrigins list.
- If you see a database connection error, check MySQL is running and verify
  credentials and database name in db.php.
- If npm install fails, check internet access and run npm install again.
- If a port is busy, Vite may print a different port; add that origin to
  allowedOrigins in db.php.

SECURITY
These credentials are only for local development. Do not deploy the default
root/blank-password configuration publicly. Use a restricted database user,
HTTPS, and production secrets for deployment.


RESPONSIVE FRONTEND STARTUP
1. Open a terminal in this folder:
   frontend/student-registration
2. Run: npm install
3. Run: npm run dev
4. Open the Vite URL shown in the terminal (usually http://localhost:5173).

Responsive layouts:
- Phones: 320px to 600px (collapsible navigation and stacked dashboard cards)
- Tablets/small laptops: 601px to 760px (collapsible navigation)
- Larger screens: desktop navigation and multi-column dashboard

The PHP backend and MySQL database files are preserved.
