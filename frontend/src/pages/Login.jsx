import { Link } from 'react-router-dom';
import Form from "../components/Form.jsx";


export default function Login() {
  return (
      <Form route={"/api/token/"} method="login" />
  );
}