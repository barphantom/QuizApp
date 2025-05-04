import { Link } from 'react-router-dom';
import Form from "../components/Form.jsx";
import Navbar from "../components/Navbar.jsx";


export default function Login() {
  return (
    <div>
      <Navbar />
      <Form route={"/api/token/"} method="login" />
    </div>
      
  );
}