import React from "react";
import { Link } from "react-router-dom";
import { IContact } from "../../models/IContact";

interface IProps {
  contact: IContact;
  deleteContact: (contactId: string | undefined) => void;
}

let ContactCard: React.FC<IProps> = (props) => {
  let { contact, deleteContact } = props;
  return (
    <>
      <div className="card shadow-lg mt-3">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-sm-3">
              <img src={contact.imageUrl} alt="" className="img-fluid" />
            </div>
            <div className="col-sm-8">
              <ul className="list-group">
                <li className="list-group-item">
                  Name: <span className="fw-bold">{contact.name}</span>
                </li>

                <li className="list-group-item">
                  Email: <span className="fw-bold">{contact.email}</span>
                </li>
                <li className="list-group-item">
                  Mobile: <span className="fw-bold">{contact.mobile}</span>
                </li>
              </ul>
            </div>
            <div className="col-sm-1 d-flex flex-column align-items-center justify-content-around">
              <Link
                to={`/contacts/view/${contact.id}`}
                className="btn btn-warning"
              >
                <i className="bi bi-eye"></i>
              </Link>
              <Link
                to={`/contacts/edit/${contact.id}`}
                className="btn btn-primary mt-1"
              >
                <i className="bi bi-pencil"></i>
              </Link>
              <button
                onClick={() => deleteContact(contact.id)}
                className="btn btn-danger mt-1"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactCard;
