import React, { useState, useEffect } from "react";
import ContactHeader from "../../components/contact-header/ContactHeader";
import { Link } from "react-router-dom";
import ContactCard from "../../components/contact-card/ContactCard";
import { IContact } from "../../models/IContact";
import { ContactService } from "../../services/ContactService";
import Spinner from "../../../ui/spinner/Spinner";
import ErrorMessage from "../../../ui/error/ErrorMessage";
import { ToastUtil } from "../../../../util/ToastUtil";

interface IState {
  loading: boolean;
  errorMessage: string;
  contacts: IContact[];
  filterdContacts: IContact[];
}

let AdminContact: React.FC = () => {
  let [searchKey, setSearchKey] = useState<string>("");

  let [state, setState] = useState<IState>({
    loading: false,
    errorMessage: "",
    contacts: [] as IContact[],
    filterdContacts: [] as IContact[],
  });

  const filterContacts = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
    setState({
      ...state,
      filterdContacts: state.contacts.filter((contact) =>
        contact.name.toUpperCase().includes(e.target.value.toUpperCase().trim())
      ),
    });
  };

  const getAllContactsData = async () => {
    try {
      setState((prevState) => {
        return {
          ...state,
          loading: true,
        };
      });
      const response = await ContactService.getAllContacts();
      setState((prevState) => {
        return {
          ...state,
          loading: false,
          contacts: response.data,
          filterdContacts: response.data,
        };
      });
    } catch (error: any) {
      setState((prevState) => {
        return {
          ...state,
          loading: false,
          errorMessage: error.message,
        };
      });
    }
  };
  useEffect(() => {
    getAllContactsData().then((r) => r);
  }, []);

  const deleteContact = (contactId: string | undefined): void => {
    if (contactId) {
      ContactService.deleteContact(contactId)
        .then((response) => {
          if (response.data) {
            getAllContactsData().then((r) => r);
            ToastUtil.displayInfoToast("Contact Delted!");
          }
        })
        .catch((error) => {
          ToastUtil.displayErrorToast("Contact Deltion Failed!");
        });
    }
  };

  let { loading, errorMessage, filterdContacts, contacts } = state;

  return (
    <>
      
      {loading && contacts.length === 0 && <Spinner />}
      <ContactHeader heading={"Contacts Admin"} color={"text-success"} />

      {/* Search section */}
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <form>
              <div className="row">
                <div className="col">
                  <input
                    value={searchKey}
                    onChange={(e) => filterContacts(e)}
                    type="text"
                    className="form-control"
                    placeholder="Search Contact"
                  />
                </div>
                <div className="col">
                  <input type="submit" className="btn btn-outline-dark" />
                  <Link to={"/contacts/add/"} className="btn btn-success ms-4">
                    <i className="fa fa-plus-circle"></i>Create New
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {!loading && errorMessage.length > 0 && (
        <ErrorMessage message={errorMessage} />
      )}
      {!loading && filterdContacts.length > 0 ? (
        <div className="container mt-3">
          <div className="row">
            <div className="col">
              {filterdContacts.map((contact, index) => {
                return (
                  <div className="col-sm-6" key={index}>
                    <ContactCard
                      contact={contact}
                      deleteContact={deleteContact}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-3">
          <div className="row">
            <div className="col text-center">
              <p className="fw-bold text-warning">No Contacts Data Found!</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminContact;
