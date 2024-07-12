import { useEffect, useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import monkey from "./assets/MongoMonkey.png"
import About from "./componenets/About.jsx"
import Contact from "./componenets/Contact.jsx"
import Home from "./componenets/Home.jsx"
import Login from "./componenets/Login.jsx"
import MyAccount from "./componenets/MyAccount.jsx"
import WorkForUs from './componenets/WorkForUs.jsx';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_EMPLOYEES_API_URL}`)
        .then(res=>res.json())
        console.log(response)
        setData(response);
      } catch (error) {
        console.error('Error fetching employees: ', error)
      }
    }
    fetchData();
  }, [])

  const style = {
    img: {
      width: '50px'
    }
  };

  return (

    <>
      <Router>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/"><img src={monkey} alt="" style={style.img} /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workforus">
                    Work For Us
                  </Link>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/myaccount">
                    My Account
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div>
          <Routes>
            <Route exact path='/' element={<Home data={data}></Home>} />
            <Route path='/about' element={<About></About>}></Route>
            <Route path='/workforus' element={<WorkForUs></WorkForUs>}></Route>
            <Route path='/myaccount' element={<MyAccount></MyAccount>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
