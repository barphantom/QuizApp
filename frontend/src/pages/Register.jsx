import { Link } from 'react-router-dom';
import Form from "../components/Form.jsx";

export default function Register() {
  return (
      <Form route={"/api/user/register/"} method="register" />
  );
}