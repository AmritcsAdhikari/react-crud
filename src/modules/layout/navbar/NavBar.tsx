import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  header: string;
  color: string;
}

let NavBar: React.FC<IProps> = (props) => {
  return (
    <>
      <nav className={`navbar navbar-dark ${props.color} navbar-expand-sm`}>
        <div className="container">
          <Link to="/" className="navbar-brand">
            <i className="bi bi-phone"></i>
            {props.header}
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/contacts/dashboard" className="nav-link px-2">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contacts/admin" className="nav-link px-2">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
