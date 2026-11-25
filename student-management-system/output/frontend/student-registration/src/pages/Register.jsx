import StudentForm from "../components/StudentForm";

function Register({ addStudent }) {
  return (
    <div className="page register-page">
      <StudentForm addStudent={addStudent} />
    </div>
  );
}

export default Register;