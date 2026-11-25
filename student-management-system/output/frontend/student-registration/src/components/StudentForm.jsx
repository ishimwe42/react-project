
function StudentForm({ addStudent }) {

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;

    const student = {
      fullname: form.fullname.value.trim(),
      email: form.email.value.trim(),
      age: Number(form.age.value),
      course: form.course.value,
      password: form.password.value
    };

    if (
      !student.fullname ||
      !student.email ||
      !student.course ||
      !student.password ||
      student.age <= 0
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const success = await addStudent(student);

    if (success) {
      alert("Student registered successfully!");
      form.reset();
    }
  }

  return (
    <div className="form-container">

      <div className="form-heading">
        <h2>Student Registration</h2>
        <p>Enter your details to register as a student.</p>
      </div>

      <form onSubmit={handleSubmit}>

        <label>Student Name</label>
        <input
          type="text"
          name="fullname"
          placeholder="Enter student name"
          required
        />

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter student email"
          required
        />

        <label>Student Age</label>
        <input
          type="number"
          name="age"
          placeholder="Enter student age"
          min="1"
          required
        />

        <label>Select Course</label>
        <select name="course" required defaultValue="">
          <option value="" disabled>
            Choose your course
          </option>
          <option value="Software Development">Software Development</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Networking">Networking</option>
          <option value="Database Management">Database Management</option>
          <option value="Web Development">Web Development</option>
          <option value="Information Technology">Information Technology</option>
        </select>

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Create your password"
          minLength="6"
          required
        />

        <button type="submit">
          Register Student
        </button>

      </form>
    </div>
  );
}

export default StudentForm;
