
function Home({ students = [], setCurrentPage }) {

  const totalCourses = new Set(
    students
      .map((s) => (s.course || "").trim().toLowerCase())
      .filter(Boolean)
  ).size;

  return (
    <div className="page home-page">

      <section className="welcome">
        <h1>Welcome to Student Management System</h1>

        <p>
          Manage student registration easily and efficiently.
        </p>

        <button onClick={() => setCurrentPage("register")}>
          Register New Student
        </button>
      </section>

      <section className="dashboard">

        <div className="dashboard-card">
          <h2>{students.length}</h2>
          <p>Total Registered Students</p>
        </div>

        <div className="dashboard-card">
          <h2>{totalCourses}</h2>
          <p>Total Courses</p>
        </div>

      </section>

    </div>
  );
}

export default Home;
