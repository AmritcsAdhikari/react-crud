import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ContactHeader from "../../components/contact-header/ContactHeader";
import { IContact } from "../../models/IContact";
import { IGroup } from "../../models/IGroup";
import { GroupService } from "../../services/GroupService";
import { ContactService } from "../../services/ContactService";
import Spinner from "../../../ui/spinner/Spinner";
import { ToastUtil } from "../../../../util/ToastUtil";

interface IState {
  loading: boolean;
  errorMessage: string;
  contact: IContact;
}

let EditContact: React.FC = () => {
  let { contactId } = useParams();

  const navigate = useNavigate();

  let [groups, setGroups] = useState<IGroup[]>([]);

  let [state, setState] = useState({
    loading: false,
    errorMessage: "",
    contact: {
      name: "",
      imageUrl: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    } as IContact,
  });

  const updateUserInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  const getContactData = async (contactId: string) => {
    try {
      setState({ ...state, loading: true });
      if (contactId) {
        let contactResponse: { data: IContact } =
          await ContactService.getContact(contactId);
        setState({
          ...state,
          loading: false,
          contact: contactResponse.data,
        });
      }
    } catch (error: any) {
      setState({
        ...state,
        loading: false,
        contact: error.message,
      });
    }
  };

  const getAllGroupsData = async () => {
    try {
      let response = await GroupService.getAllGroups();
      setGroups(response.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect((): void => {
    getAllGroupsData().then((r) => r);
  }, []);

  useEffect((): void => {
    if (contactId) {
      getContactData(contactId).then((r) => r);
    }
  }, [contactId]);

  const submitUpdateContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (contactId) {
      ContactService.updateContact(state.contact, contactId)
        .then((response) => {
          navigate("/contacts/admin");
          ToastUtil.displaySuccessToast("Contact Updated!");
        })
        .catch((err) => {
          navigate("/contacts/edit/${contactId}");
          ToastUtil.displayErrorToast("Contact Update Failed!");
        });
    }
  };

  let { loading, errorMessage, contact } = state;

  return (
    <>
      {loading && groups.length === 0 && <Spinner />}
      {!loading && groups.length > 0 && Object.keys(contact).length > 0 && (
        <>
          <ContactHeader heading={"Edit Contact"} color={"text-primary"} />
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <form onSubmit={(e) => submitUpdateContact(e)}>
                  <div className="m-2">
                    <input
                      value={contact.name}
                      name={"name"}
                      onChange={(e) => updateUserInput(e)}
                      type="text"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                  <div className="m-2">
                    <input
                      value={contact.imageUrl}
                      name={"imageUrl"}
                      onChange={(e) => updateUserInput(e)}
                      type="text"
                      className="form-control"
                      placeholder="Photo Url"
                    />
                  </div>
                  <div className="m-2">
                    <input
                      value={contact.mobile}
                      name={"mobile"}
                      onChange={(e) => updateUserInput(e)}
                      type="number"
                      className="form-control"
                      placeholder="Mobile"
                    />
                  </div>
                  <div className="m-2">
                    <input
                      value={contact.email}
                      name={"email"}
                      onChange={(e) => updateUserInput(e)}
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div className="m-2">
                    <input
                      value={contact.company}
                      name={"company"}
                      onChange={(e) => updateUserInput(e)}
                      type="text"
                      className="form-control"
                      placeholder="Company"
                    />
                  </div>
                  <div className="m-2">
                    <input
                      value={contact.title}
                      name={"title"}
                      onChange={(e) => updateUserInput(e)}
                      type="text"
                      className="form-control"
                      placeholder="Title"
                    />
                  </div>
                  <div className="m-2">
                    <select
                      value={contact.groupId}
                      name={"groupId"}
                      onChange={(e) => updateUserInput(e)}
                      className="form-control"
                    >
                      <option value="">Select Group</option>
                      {groups.map((group, index) => {
                        return (
                          <option key={index} value={group.id}>
                            {group.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="m-2">
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value={"Update"}
                    />
                    <Link to={"/contacts/admin"} className="btn btn-dark ms-2">
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
              <div className="col-sm-3">
                <img
                  src={contact.imageUrl}
                  alt=""
                  className="img-fluid rounded-circle shadow-lg"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditContact;
