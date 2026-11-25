function About() {
  return (
    <div className="page about">
      <h1>About Our System</h1>

      <p>
        Student Registration System is an application designed to help
        manage student information and registration records in one place.
      </p>

      <h3>Our Features</h3>

      <ul>
        <li>Register new students</li>
        <li>View registered students from the database</li>
        <li>Search students by name or email</li>
        <li>Delete student records</li>
        <li>View student and course statistics</li>
      </ul>

      <p>
        The application uses React for the frontend and PHP with MySQL
        for storing and managing student records.
      </p>
    </div>
  );
}

export default About;
