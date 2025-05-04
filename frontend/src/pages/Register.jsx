import { Link } from 'react-router-dom';
import Form from "../components/Form.jsx";
import Navbar from "../components/Navbar.jsx";

export default function Register() {
  return (
    <div>
      <Navbar />
      <Form route={"/api/user/register/"} method="register" />
    </div>
    
  );
}