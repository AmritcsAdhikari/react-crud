import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./modules/layout/navbar/NavBar";
import Home from "./modules/layout/home/Home";
import ContactDashboard from "./modules/contact/pages/dashboard/ContactDashboard";
import "./App.css";

import AdminContact from "./modules/contact/pages/admin/AdminContact";
import AddContact from "./modules/contact/pages/add-contact/AddContact";
import EditContacat from "./modules/contact/pages/edit-contact/EditContact";
import ViewContact from "./modules/contact/pages/view-contact/ViewContact";

/* Bootsratp Configuration */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

/* Toasatify css */
import "../node_modules/react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer
          position="top-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      <div className="App">
        <NavBar header="Contact Manager" color="bg-dark" />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/contacts/dashboard"} element={<ContactDashboard />} />
          <Route path={"/contacts/admin"} element={<AdminContact />} />
          <Route path={"contacts/add"} element={<AddContact />} />
          <Route
            path={"/contacts/edit/:contactId"}
            element={<EditContacat />}
          />
          <Route path={"/contacts/view/:contactId"} element={<ViewContact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
