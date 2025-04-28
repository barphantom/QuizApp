import { Outlet } from "react-router-dom";
import Layout from "./components/Layout.jsx"
import './App.css'

function App() {

  return (
      <Layout>
        <Outlet />
      </Layout>
  )
}

export default App
