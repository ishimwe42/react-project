
import { useState } from "react";

function StudentList({
  students = [],
  deleteStudent,
  loading = false,
  error = ""
}) {
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) => {
    const name = String(
      student.fullname || student.name || ""
    );

    const email = String(student.email || "");

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="page">

      <h1>Registered Students</h1>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      {loading ? (
        <p>Loading students...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : filteredStudents.length === 0 ? (
        <p>No students found.</p>
      ) : (

        <div className="table-container">

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Course</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student, index) => (

                <tr key={student.id || index}>
                  <td data-label="Student ID">{student.id}</td>
                  <td data-label="Full name">{student.fullname || student.name}</td>
                  <td data-label="Email">{student.email}</td>
                  <td data-label="Age">{student.age}</td>
                  <td data-label="Course">{student.course}</td>

                  <td data-label="Action">
                    <button
                      className="delete-btn"
                      onClick={() => deleteStudent(student.id)}
                      disabled={!student.id || !deleteStudent}
                    >
                      Delete
                    </button>
                  </td>
                </tr>

              ))}
            </tbody>
          </table>

        </div>
      )}

    </div>
  );
}

export default StudentList;
