import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{height:80,width:"100%"}} >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <i className="fab fa-github fa-2x mx-3 ps-1"></i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="me-3">
            <div className="form-white input-group" style={{ width: 250 }}>
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search Blog"
                aria-label="Search"
                aria-describedby="search-addon"
              />
            </div>
          </form>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Public Blogs
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/privateBlogs/${currentUser.id}` } state={currentUser.id} > 
                Your Blogs
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/create">
                Create Blog
              </a>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            {currentUser != null ? (
              <a className="nav-link" href="/account">
                {currentUser.name}
              </a>
            ) : (
              <a className="nav-link" href="/login">
                Login
              </a>
            )}
          </li>

          <li className="nav-item">
            {currentUser != null ? (
              <Link className="nav-link" onClick={()=>logout()} to="/login">
                Logout
              </Link>
            ) : (
              <a className="nav-link" href="/signin">
                Register
              </a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
