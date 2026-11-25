
import { useState, useEffect } from "react";

import Navigation from "./components/Navigation.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import StudentList from "./pages/StudentList.jsx";
import About from "./pages/About.jsx";

import "./App.css";

const API = (import.meta.env.VITE_API_BASE_URL || "http://localhost/student_backend").replace(/\/$/, "");

// Read PHP response and display errors if PHP returns HTML
async function readPHPResponse(response) {
  const result = await response.text();

  console.log("PHP RESPONSE:", result);

  let data;

  try {
    data = JSON.parse(result);
  } catch (error) {
    const message = result
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 300);

    throw new Error("PHP ERROR: " + message);
  }

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

function App() {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load students from MySQL
  async function loadStudents() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API}/get_records.php`);

      const data = await readPHPResponse(response);

      setStudents(data.students || []);

      return true;

    } catch (err) {
      setError(err.message);
      console.error("Loading error:", err);
      return false;

    } finally {
      setLoading(false);
    }
  }

  // Load records when application starts
  useEffect(() => {
    loadStudents();
  }, []);

  // Register student in MySQL
  async function addStudent(student) {
    try {
      const response = await fetch(`${API}/register.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
      });

      const data = await readPHPResponse(response);

      console.log("Registration successful:", data);

      // Refresh student records
      await loadStudents();

      // Return to Home after registration
      setCurrentPage("home");

      return true;

    } catch (err) {
      console.error("Registration error:", err);
      alert(err.message);
      return false;
    }
  }

  // Delete student from MySQL
  async function deleteStudent(id) {
    try {
      const response = await fetch(`${API}/delete_student.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });

      await readPHPResponse(response);

      await loadStudents();

    } catch (err) {
      console.error("Delete error:", err);
      alert(err.message);
    }
  }

  // Display pages
  function renderPage() {
    switch (currentPage) {

      case "home":
        return (
          <Home
            students={students}
            setCurrentPage={setCurrentPage}
          />
        );

      case "register":
        return (
          <Register addStudent={addStudent} />
        );

      case "students":
        return (
          <>
            {loading && <p>Loading students...</p>}

            {error && (
              <p className="error-message">{error}</p>
            )}

            {!loading && !error && (
              <StudentList
                students={students}
                deleteStudent={deleteStudent}
              />
            )}
          </>
        );

      case "about":
        return <About />;

      default:
        return (
          <Home
            students={students}
            setCurrentPage={setCurrentPage}
          />
        );
    }
  }

  return (
    <div className="app">

      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <main>
        {renderPage()}
      </main>

      <footer>
        <p>
          &copy; 2026 Student Registration System.
          All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}

export default App;
