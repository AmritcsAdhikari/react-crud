import React, { useEffect, useState } from "react";
import ContactHeader from "../../components/contact-header/ContactHeader";
import { Link, useParams } from "react-router-dom";
import { IContact } from "../../models/IContact";
import { ContactService } from "../../services/ContactService";
import { GroupService } from "../../services/GroupService";
import Spinner from "../../../ui/spinner/Spinner";
import { IGroup } from "../../models/IGroup";

interface IState {
  loading: boolean;
  errorMessage: string;
  contact: IContact;
  group: IGroup;
}

let ViewContact: React.FC = () => {
  let { contactId } = useParams();
  let [state, setState] = useState<IState>({
    loading: false,
    errorMessage: "",
    contact: {} as IContact,
    group: {} as IGroup,
  });

  /* - .catch().then() - clumsy */
  useEffect(() => {
    if (contactId) {
      setState({ ...state, loading: true });
      ContactService.getContact(contactId)
        ?.then((contactResponse) => {
          let contact: IContact = contactResponse.data;
          GroupService.getGroup(contactResponse.data)?.then((groupResponse)=>{
            setState({ ...state, loading: false, contact:contact, group: groupResponse.data });
          }).catch((err)=>{
            setState({ ...state, loading: false, errorMessage: err.message });
          })
        })
        .catch((error) => {
          setState({ ...state, loading: false, errorMessage: error.message });
        });
    }
  }, [contactId]);


  /* - async() await - cleaner */
  
  let { loading, errorMessage, contact, group } = state;
  return (
    <>
      {loading &&
        Object.keys(contact).length === 0 &&
        Object.keys(group).length === 0 && <Spinner />}
      <ContactHeader heading={"View Contact"} color={"text-warning"} />

      {!loading &&
        Object.keys(contact).length > 0 &&
        Object.keys(group).length > 0 && (
          <div className="container mt-3">
            <div className="row align-items-center">
              <div className="col-sm-3">
                <img
                  src={contact.imageUrl}
                  alt=""
                  className="img-fluid rounded-circle shadow-lg"
                />
              </div>
              <div className="col-sm-6">
                <ul className="list-group">
                  <li className="list-group-item">
                    Name: <span className="fw-bold">{contact.name}</span>
                  </li>
                  <li className="list-group-item">
                    Email: <span className="fw-bold">{contact.email}</span>
                  </li>
                  <li className="list-group-item">
                    Company: <span className="fw-bold">{contact.company}</span>
                  </li>
                  <li className="list-group-item">
                    Mobile: <span className="fw-bold">{contact.mobile}</span>
                  </li>
                  <li className="list-group-item">
                    Title: <span className="fw-bold">{contact.title}</span>
                  </li>
                  <li className="list-group-item">
                    Group: <span className="fw-bold">{group.name} </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Link to={"/contacts/admin"} className="btn btn-warning">
                  <i className="bi bi-arrow-left-circle-fill"></i>Back
                </Link>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default ViewContact;
