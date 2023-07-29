import React from "react";
import { Link } from "react-router-dom";

interface IProps {}

let Home: React.FC<IProps> = (props) => {
  return (
    <>
      <div className="landing">
        <div className="wrapper">
          <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <p className="display-1">Contact Manager</p>
            <div>
              <Link className="btn btn-success m-2" to={"/contacts/admin"}>
                Admin
              </Link>
              <Link className="btn btn-warning m-2" to={"/contacts/dashboard"}>
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
